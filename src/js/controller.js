import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model.js";
import paginationView from "./views/paginationView.js";
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
    resultsView.render(model.getSearchResults());
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

function init() {
  recipeView.addHelperRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationControl);
  recipeView.addHelperUpdateServings(controlServings);
}

init();
