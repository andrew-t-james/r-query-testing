import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BookListPresenter from "./BooksListPresenter";

export default function BookListComponent() {
  let booksPresenter = new BookListPresenter(useQuery);
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  useEffect(() => {
    booksPresenter.load((generatedViewModel) => {
      copyViewModelToStateViewModel(generatedViewModel);
    });
  }, []);

  return (
    <div>
      <h5 className="book-list-title">Book List (api)</h5>
      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            booksPresenter.setMode("private");
          }}
        >
          Show private
        </button>
        <button
          type="button"
          onClick={() => {
            booksPresenter.setMode("public");
          }}
        >
          Show public
        </button>
      </div>
      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              booksPresenter.sortBy("name", "asc");
            }}
          >
            Filter by name ASC
          </button>
          <button
            type="button"
            onClick={() => {
              booksPresenter.sortBy("name", "desc");
            }}
          >
            Filter by name DESC
          </button>
          <button
            type="button"
            onClick={() => {
              booksPresenter.reset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
