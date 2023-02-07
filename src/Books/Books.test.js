import { waitFor } from "@testing-library/react";
import httpGateway from "../Shared/HttpGateway";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import {sleep} from "../TestTools/testing";

describe("add book", () => {
  let bookAdderTestHarness = null;
  let bookListViewModel = null;
  beforeEach(async () => {
    bookAdderTestHarness = new BookAdderTestHarness();
    bookAdderTestHarness.clearQueryClient();
    await bookAdderTestHarness.init((generatedViewModel) => {
      bookListViewModel = generatedViewModel;
    });
  });

  it("should call api", async () => {
    await bookAdderTestHarness.addBook();

    expect(httpGateway.post).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/jpparkin@gmail.com/books",
      {
        name: "UFT",
        author: "Pete Heard",
        ownerId: "jpparkin@gmail.com",
      }
    );
  });

  it("should load(anchor) and reload books", async () => {
    // anchor
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/jpparkin@gmail.com/allbooks"
    );
    expect(bookListViewModel.length).toBe(5);
    expect(bookListViewModel[0].name).toBe("Moby Dick");
    expect(bookListViewModel[4].name).toBe("The Hobbit");

    // reload (pivot)
    await bookAdderTestHarness.addBook();

    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/jpparkin@gmail.com/allbooks"
    );

    expect(bookListViewModel.length).toBe(6);
    expect(bookListViewModel[0].name).toBe("Moby Dick");
    expect(bookListViewModel[4].name).toBe("The Hobbit");
    expect(bookListViewModel[5].name).toBe("Wind in the willows");
  });

  it("should sort by name asc", async () => {
    // spot check
    expect(bookListViewModel[0].name).toBe("Moby Dick");
    expect(bookListViewModel[4].name).toBe("The Hobbit");

    await waitFor(() => sleep(10));
    await bookAdderTestHarness.bookListPresenter.sortBy("name", "asc");

    expect(bookListViewModel[0].name).toBe("I, Robot");
    expect(bookListViewModel[4].name).toBe("Wind in the willows");
  });

  it("should sort by name desc", async () => {
    // spot check
    expect(bookListViewModel[0].name).toBe("Moby Dick");
    expect(bookListViewModel[4].name).toBe("The Hobbit");

    await waitFor(() => sleep(10));
    await bookAdderTestHarness.bookListPresenter.sortBy("name", "desc");

    expect(bookListViewModel[0].name).toBe("Wind in the willows");
    expect(bookListViewModel[4].name).toBe("I, Robot");
  });

  it("should filter public and private books", async () => {
    expect(bookListViewModel.length).toBe(5);

    await bookAdderTestHarness.bookListPresenter.setMode("private");

    expect(bookListViewModel.length).toBe(3);

    await bookAdderTestHarness.bookListPresenter.setMode("public");

    expect(bookListViewModel.length).toBe(5);
  });
});
