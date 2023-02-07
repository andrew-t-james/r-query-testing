import booksRepository from "./BooksRepository.js";

export default class BookListPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };

  sortBy = async (arg, direction) => {
    await booksRepository.sortBy(arg, direction);
  };

  setMode = async (mode) => {
    booksRepository.mode = mode === "public" ? "allbooks" : "books";
    await booksRepository.loadApiData();
  };

  reset = async () => {
    await booksRepository.reset();
  };
}
