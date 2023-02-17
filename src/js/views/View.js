import icons from "../../img/icons.svg";

export default class View {
  _dataVar;
  _errMsg = "Could Not Find your Recipe 😥";
  render(stateVar) {
    this._dataVar = stateVar;
    if (
      !this._dataVar ||
      (Array.isArray(this._dataVar) && this._dataVar.length === 0)
    )
      return this.renderError(this._errMsg);

    const markUp = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderSpinner() {
    const markUp = `
        <div class="spinner">
          <svg>
          <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError() {
    const markUp = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this._errMsg}</p>
    </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError(msgStr = "") {
    const markUp = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${msgStr}</p>
    </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  addHelperRender(handlerFunc) {
    ["hashchange", "load"].forEach((eventVar) =>
      window.addEventListener(eventVar, handlerFunc)
    );
  }
}
