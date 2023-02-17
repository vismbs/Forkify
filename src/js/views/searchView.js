class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const queryString =
      this.#parentElement.querySelector(".search__field").value;
    this.clearVal();
    return queryString;
  }

  clearVal() {
    this.#parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(callFunc) {
    this.#parentElement.addEventListener("submit", function (eV) {
      eV.preventDefault();
      callFunc();
    });
  }
}

export default new SearchView();
