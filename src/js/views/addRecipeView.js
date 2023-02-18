import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _windowEl = document.querySelector(".add-recipe-window");
  _overlayEL = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    this.addHandlerShowHideWindow();
  }
  _generateMarkup() {}
  toggleModal() {
    this._windowEl.classList.toggle("hidden");
    this._overlayEL.classList.toggle("hidden");
  }
  addHandlerShowHideWindow() {
    this._btnOpen.addEventListener("click", this.toggleModal.bind(this));
    this._btnClose.addEventListener("click", this.toggleModal.bind(this));
  }

  addHandlerUpload(callerFunc) {
    this._parentElement.addEventListener("submit", function (eV) {
      eV.preventDefault();
      const dataVar = Object.fromEntries([...new FormData(this)]);
      callerFunc(dataVar);
    });
  }
}

export default new AddRecipeView();
