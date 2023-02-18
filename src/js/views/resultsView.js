import View from "./View";
import icons from "../../img/icons.svg";
import preView from "./preView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMsg = "No recipes matching your query. Please try again 😥";
  _generateMarkup() {
    return this._dataVar
      .map((resultVar) => preView.render(resultVar, false))
      .join("");
  }
}

export default new ResultsView();
