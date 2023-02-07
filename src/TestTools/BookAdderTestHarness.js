import {
  QueriesObserver,
  MutationObserver
} from "@tanstack/react-query";
import BookListPresenter from "../Books/BooksListPresenter";
import AddBooksPresenter from "../AddBook/AddBookPresenter";
import queryClient from "../Shared/queryClient";
import httpGateway from "../Shared/HttpGateway";
import booksRepository from "../Books/BooksRepository";
import GetPublicBooksStub from "../TestTools/GetPublicBooksStub";
import GetPrivateBooksStub from "../TestTools/GetPrivateBooksStub";

export default class BookAdderTestHarness {
  constructor() {
    this.addBooksPresenter = new AddBooksPresenter();
    this.bookListPresenter = new BookListPresenter();
  }

  clearQueryClient() {
    queryClient.clear();
  }

  async init(callback) {
    jest.clearAllMocks();

    booksRepository.booksPm = new QueriesObserver(queryClient, [
      {
        queryKey: ["books", "books"],
        queryFn: () => booksRepository.fetchBooks("books"),
      },
      {
        queryKey: ["books", "allbooks"],
        queryFn: () => booksRepository.fetchBooks("allbooks"),
      },
    ]);

    this.bookListPresenter.setMode("public");

    httpGateway.get = jest.fn().mockImplementation((path) => {
      if (path === "https://api.logicroom.co/api/jpparkin@gmail.com/books") {
        return GetPrivateBooksStub();
      } else if (
        path === "https://api.logicroom.co/api/jpparkin@gmail.com/allbooks"
      ) {
        return GetPublicBooksStub();
      }
    });

    await this.bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();

    booksRepository.lastAddedBookPm = new MutationObserver(queryClient, {
      mutationKey: ["lastAddedBook"],
      mutationFn: booksRepository.addBook,
    });

    const pivotedStub = GetPublicBooksStub();
    pivotedStub.result.push(pivotedStub.result[2]);


    httpGateway.post = jest.fn();

    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });


    await this.addBooksPresenter.addBook("UFT", "Pete Heard");
  }
}
