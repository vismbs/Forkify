import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";

// Key: 778fe704-1194-414c-8a96-d6411c211872

const controlRecipe = async function () {
  try {
    const idVar = window.location.hash.slice(1);
    if (!idVar) return;
    recipeView.renderSpinner();
    await model.loadRecipe(idVar);
    recipeView.render(model.stateObj.recipeState);
  } catch (error) {
    recipeView.renderError(`Could not load your Recipe 😥`);
  }
};

const controlSearchResults = async function () {
  try {
    const queryString = searchView.getQuery();
    resultsView.renderSpinner();
    await model.loadSearchResults(queryString);
    resultsView.render(model.getSearchResults(2));
  } catch (error) {
    console.log(error);
    recipeView.renderError(`Could not load your Search Results 😥`);
  }
};

function init() {
  recipeView.addHelperRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
controlSearchResults();
