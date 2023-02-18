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

  update(stateVar) {
    if (!stateVar || (Array.isArray(stateVar) && stateVar.length === 0))
      return this.renderError();
    this._dataVar = stateVar;

    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const oldElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((elemEl, iVar) => {
      const curEl = oldElements[iVar];
      if (
        !elemEl.isEqualNode(curEl) &&
        elemEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.textContent = elemEl.textContent;
      }

      if (!elemEl.isEqualNode(curEl)) {
        Array.from(elemEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  addHelperRender(handlerFunc) {
    ["hashchange", "load"].forEach((eventVar) =>
      window.addEventListener(eventVar, handlerFunc)
    );
  }
}
