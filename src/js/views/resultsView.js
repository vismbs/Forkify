import View from "./View";
import icons from "../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _dataVar;
  _errMsg = "No recipes matching your query. Please try again 😥";
  _generateMarkup() {
    return this._dataVar.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(recVar) {
    return `
    <li class="preview">
       <a class="preview__link" href="#${recVar.id}">
          <figure class="preview__fig">
                <img src="${recVar.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recVar.title}</h4>
            <p class="preview__publisher">${recVar.publisher}</p>
          </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
