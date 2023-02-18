import View from "./View";
import icons from "../../img/icons.svg";

class PreView extends View {
  _parentElement = "";
  _generateMarkup() {
    return `
    <li class="preview">
       <a class="preview__link ${
         this._dataVar.id == window.location.hash.slice(1)
           ? "preview__link--active"
           : ""
       }" href="#${this._dataVar.id}">
          <figure class="preview__fig">
                <img src="${this._dataVar.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._dataVar.title}</h4>
            <p class="preview__publisher">${this._dataVar.publisher}</p>

            <div class="preview__user-generated ${
              this._dataVar.key ? "" : "hidden"
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>

          </div>
      </a>
    </li>
    `;
  }
}

export default new PreView();
