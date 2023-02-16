import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// Key: 778fe704-1194-414c-8a96-d6411c211872

const controlRecipe = async function () {
  try {
    const idVar = window.location.hash.slice(1);
    if (!idVar) return;
    recipeView.renderSpinner();
    await model.loadRecipe(idVar);
    recipeView.render(model.stateObj.recipeState);
  } catch (error) {
    alert(error);
  }
};

function init() {
  recipeView.addHelperRender(controlRecipe);
}

init();
