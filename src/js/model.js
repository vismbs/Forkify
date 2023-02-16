import "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helper";

export const stateObj = {
  recipeState: {},
};

export const loadRecipe = async function (hashID) {
  try {
    const dataVar = await getJSON(`${API_URL}${hashID}`);
    let { recipe } = dataVar.data;
    stateObj.recipeState = recipe;
  } catch (error) {
    console.error(error);
  }
};
