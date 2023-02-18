import preView from "./preView";
import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errMsg = "No Bookmarks Yet. Bookmark One!!";
  _generateMarkup() {
    return this._dataVar
      .map((resultVar) => preView.render(resultVar, false))
      .join("");
  }
  addHandlerRender(callFunc) {
    window.addEventListener("load", callFunc);
  }
}

export default new BookmarksView();
