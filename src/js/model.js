import "regenerator-runtime";
import { API_URL, RESULTS_PP, API_KEY } from "./config";
import { getJSON, sendJSON } from "./helper";

export const stateObj = {
  recipeState: {},
  searchState: {
    queryString: "",
    resultArr: [],
    resultPerPage: RESULTS_PP,
    pageNumber: 2,
    servNum: 4,
  },
  bookMarks: [],
};

const createRecipeObject = function (dataVar) {
  const { recipe } = dataVar.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source_url: recipe.source_url,
    image_url: recipe.image_url,
    servings: recipe.servings,
    cooking_time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (hashID) {
  try {
    const dataVar = await getJSON(`${API_URL}${hashID}?key=${API_KEY}`);
    let { recipe } = dataVar.data;
    stateObj.recipeState = recipe;

    if (stateObj.bookMarks.some((bookMark) => bookMark.id === recipe.id))
      stateObj.recipeState.bookMarked = true;
    else stateObj.recipeState.bookMarked = false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResults = async function (queryString) {
  try {
    const dataVar = await getJSON(
      `${API_URL}?search=${queryString}&key=${API_KEY}`
    );
    stateObj.searchState.queryString = queryString;
    stateObj.searchState.resultArr = dataVar.data.recipes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchResults = function (pageNumber = 1) {
  stateObj.searchState.pageNumber = pageNumber;
  const startIndex = (pageNumber - 1) * stateObj.searchState.resultPerPage;
  const endIndex = pageNumber * stateObj.searchState.resultPerPage;
  return stateObj.searchState.resultArr.slice(startIndex, endIndex);
};

export const updateServings = function (valueVar) {
  if (stateObj.searchState.servNum + valueVar === 0) return;

  stateObj.recipeState.ingredients.forEach((ing) => {
    ing.quantity =
      (ing.quantity * (stateObj.searchState.servNum + valueVar)) /
      stateObj.recipeState.servings;
  });

  stateObj.recipeState.servings = stateObj.searchState.servNum + valueVar;
  stateObj.searchState.servNum += valueVar;
};

export const addBookmark = function (recVar) {
  stateObj.bookMarks.push(recVar);
  if (recVar.id === stateObj.recipeState.id)
    stateObj.recipeState.bookMarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (idVar) {
  const indexNum = stateObj.bookMarks.findIndex((fnEl) => fnEl.id === idVar);
  if (idVar === stateObj.recipeState.id)
    stateObj.recipeState.bookMarked = false;
  stateObj.bookMarks.splice(indexNum, 1);
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem("Bookmarks", JSON.stringify(stateObj.bookMarks));
};

const init = function () {
  const localStore = localStorage.getItem("Bookmarks");
  if (localStore) stateObj.bookMarks = JSON.parse(localStore);
};

export const uploadRecipe = async function (recVar) {
  try {
    ingredients = Object.entries(recVar)
      .filter((enArr) => enArr[0].startsWith("ingredient") && enArr[1] !== "")
      .map((ingrElem) => {
        const ingArr = ingrElem[1].split(",").map((ingEl) => ingEl.trim());
        if (ingArr.length !== 3) throw new Error("Wrong Format");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipeObj = {
      title: recVar.title,
      source_url: recVar.sourceUrl,
      image_url: recVar.image,
      publisher: recVar.publisher,
      cooking_time: +recVar.cookingTime,
      servings: +recVar.servings,
      ingredients,
    };

    const resData = await sendJSON(`${API_URL}?key=${API_KEY}`, recipeObj);
    stateObj.recipeState = createRecipeObject(resData);
    console.log(stateObj.recipeState);
    addBookmark(stateObj.recipeState);
  } catch (error) {
    throw error;
  }
};

init();
