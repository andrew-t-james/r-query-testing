import booksRepository from "../Books/BooksRepository";

export default class StatsPresenter {
  load = async (callback) => {
    await booksRepository.getStats((bookCount, lastAddedBook) => {
      var vm = { lastAddedBook: null, bookCount: null };
      vm.lastAddedBook = lastAddedBook;
      vm.bookCount = bookCount;
      callback(vm);
    });
  };
}
