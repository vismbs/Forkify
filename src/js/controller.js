import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

["hashchange", "load"].forEach((eventVar) =>
  window.addEventListener(eventVar, controlRecipe)
);
