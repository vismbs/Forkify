import "regenerator-runtime";
import { API_URL } from "./config";

export const stateObj = {
  recipeState: {},
};

export const loadRecipe = async function (hashID) {
  try {
    const resVar = await fetch(
      `${API_URL}${hashID}`
    );
    const dataVar = await resVar.json();
    if (!resVar.ok) throw new Error(`${resVar.status}: ${dataVar.message}`);
    let { recipe } = dataVar.data;
    stateObj.recipeState = recipe;
  } catch (error) {
    alert(error);
  }
};
