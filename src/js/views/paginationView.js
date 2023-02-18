import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _buttonLeft = document.querySelector(".pagination__btn--prev");
  _buttonRight = document.querySelector(".pagination__btn--next");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._dataVar.resultArr.length / this._dataVar.resultPerPage
    );
    return `
            ${
              this._dataVar.pageNumber === 1
                ? ""
                : `
                <button data-goto="${
                  this._dataVar.pageNumber - 1
                }" class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${this._dataVar.pageNumber - 1}</span>
                </button>
                `
            }

          ${
            this._dataVar.pageNumber === numPages
              ? ""
              : `
                  <button data-goto="${
                    this._dataVar.pageNumber + 1
                  }" class="btn--inline pagination__btn--next">
                    <span>Page ${this._dataVar.pageNumber + 1}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </button>
                `
          }
    `;
  }

  addHandlerClick(callFunc) {
    this._parentElement.addEventListener("click", function (eV) {
      const btnVar = eV.target.closest(".btn--inline");
      if (!btnVar) return;
      const goToPage = +btnVar.dataset.goto;
      callFunc(goToPage);
    });
  }
}

export default new PaginationView();
