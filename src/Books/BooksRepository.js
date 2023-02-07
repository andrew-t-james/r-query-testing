import { QueryObserver, QueriesObserver, MutationObserver } from "@tanstack/react-query";
import httpGateway from "../Shared/HttpGateway";
import queryClient from "../Shared/queryClient";

class BooksRepository {
  mode = "books";

  constructor() {
    this.booksPm = new QueriesObserver(queryClient, [
      {
        queryKey: ["books", "books"],
        queryFn: () => this.fetchBooks("books"),
        enabled: this.mode === "books",
      },
      {
        queryKey: ["books", "allbooks"],
        queryFn: () => this.fetchBooks("allbooks"),
        enabled: this.mode === "allbooks",
      },
    ]);

    this.lastAddedBookPm = new MutationObserver(queryClient, {
      mutationKey: ["lastAddedBook"],
      mutationFn: this.addBook,
    });
  }

  getBooks = async (callback) => {
    this.booksPm.subscribe((result) => {
      const books = this.getBooksFromResult(result);
      if (books && books.result) {
        callback(books.result);
      } else {
        callback([]);
      }
    });

    await this.loadApiData();
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
      ownerId: "jpparkin@gmail.com",
    };
    await httpGateway.post(
      "https://api.logicroom.co/api/jpparkin@gmail.com/books",
      dto
    );

    this.loadApiData();
  };

  sortBy = async (arg, direction) => {
    let books = queryClient.getQueryData(["books", this.mode]);

    let sortedBooks;
    if (direction === "asc") {
      sortedBooks = books.result.sort((a, b) => (a[arg] > b[arg] ? 1 : -1));
    } else {
      sortedBooks = books.result.sort((a, b) => (a[arg] < b[arg] ? 1 : -1));
    }

    queryClient.setQueryData(["books", this.mode], {
      success: true,
      result: sortedBooks,
    });
    // await queryClient.invalidateQueries({
    //   queryKey: ["books", this.mode],
    //   refetchActive: false,
    // });
  };

  getStats = async (callback) => {
    this.booksPm.subscribe(() => {
      let bookCount = 0;
      let bookName = "";
      const allBooks = queryClient.getQueryData({
        queryKey: ["books", this.mode],
      });

      if (allBooks) {
        bookCount = allBooks.result.length;
        bookName = allBooks.result[allBooks.result.length - 1].name;
      }

      callback(bookCount, bookName);
    });

    await this.loadApiData();
  };

  fetchBooks = async (mode) => {
    return await httpGateway.get(
      "https://api.logicroom.co/api/jpparkin@gmail.com/" + mode
    );
  };

  postBook = async (dto) => {
    await httpGateway.post(
      "https://api.logicroom.co/api/jpparkin@gmail.com/books",
      dto
    );
  };

  loadApiData = async () => {
    await queryClient.invalidateQueries(["books"]);
    await queryClient.invalidateQueries(["lastAddedBook"]);
  };

  getBooksFromResult = (result) => {
    if (result.length === 2) {
      if (this.mode === "books") {
        return result[0].data;
      } else {
        return result[1].data;
      }
    } else {
      return null;
    }
  };

  reset = async () => {
    await httpGateway.get(
      "https://api.logicroom.co/api/jpparkin@gmail.com/" + "reset"
    );
    await this.loadApiData();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
