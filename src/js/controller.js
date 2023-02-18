import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model.js";
import bookmarkView from "./views/bookmarkView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import addRecipeView from "./views/addRecipeView.js";

// Key: 778fe704-1194-414c-8a96-d6411c211872

const controlRecipe = async function () {
  try {
    const idVar = window.location.hash.slice(1);
    if (!idVar) return;
    recipeView.renderSpinner();
    await model.loadRecipe(idVar);
    recipeView.render(model.stateObj.recipeState);
    resultsView.update(model.getSearchResults());
    bookmarkView.update(model.stateObj.bookMarks);
  } catch (error) {
    console.log(error);
    recipeView.renderError(`Could not load your Recipe 😥`);
  }
};

const controlSearchResults = async function () {
  try {
    const queryString = searchView.getQuery();
    resultsView.renderSpinner();
    await model.loadSearchResults(queryString);
    resultsView.render(model.getSearchResults(1));
    paginationView.render(model.stateObj.searchState);
  } catch (error) {
    console.log(error);
    recipeView.renderError(`Could not load your Search Results 😥`);
  }
};

const controlServings = function (valueVar) {
  model.updateServings(valueVar);
  recipeView.update(model.stateObj.recipeState);
};

const paginationControl = function (goToPage) {
  try {
    model.stateObj.searchState.pageNumber = goToPage;
    resultsView.render(
      model.getSearchResults(model.stateObj.searchState.pageNumber)
    );
    paginationView.render(model.stateObj.searchState);
  } catch (error) {
    paginationView.renderError(error);
  }
};

const controlAddBookmark = function () {
  if (!model.stateObj.recipeState.bookMarked) {
    model.addBookmark(model.stateObj.recipeState);
  } else {
    model.deleteBookmark(model.stateObj.recipeState.id);
  }
  recipeView.update(model.stateObj.recipeState);
  bookmarkView.render(model.stateObj.bookMarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.stateObj.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.stateObj.recipeState);
    addRecipeView.renderMessage("Recipe Added Succesfully");
    setTimeout(function () {
      addRecipeView.toggleModal();
    }, 2500);
    bookmarkView.render(model.stateObj.bookMarks);
    window.history.pushState(null, "", `#${model.stateObj.recipeState.id}`);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

function init() {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHelperRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationControl);
  recipeView.addHelperUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
