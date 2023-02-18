import "regenerator-runtime";
import { API_URL, RESULTS_PP } from "./config";
import { getJSON } from "./helper";

export const stateObj = {
  recipeState: {},
  searchState: {
    queryString: "",
    resultArr: [],
    resultPerPage: RESULTS_PP,
    pageNumber: 2,
  },
};

export const loadRecipe = async function (hashID) {
  try {
    const dataVar = await getJSON(`${API_URL}${hashID}`);
    let { recipe } = dataVar.data;
    stateObj.recipeState = recipe;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResults = async function (queryString) {
  try {
    const dataVar = await getJSON(`${API_URL}?search=${queryString}`);
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
