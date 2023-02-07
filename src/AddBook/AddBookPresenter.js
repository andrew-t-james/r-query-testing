import booksRepository from "../Books/BooksRepository";

export default class AddBooksPresenter {
  addBook = async (name, author) => {
    await booksRepository.addBook({ name: name, author: author });
  };
}
