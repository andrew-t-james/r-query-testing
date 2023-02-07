import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "./StatsPresenter";

describe("stats", () => {
  let statsViewModel = null;
  let bookAdderTestHarness;

  beforeEach(async () => {
    jest.resetAllMocks();

    bookAdderTestHarness = new BookAdderTestHarness();
    bookAdderTestHarness.clearQueryClient();

    await bookAdderTestHarness.init(() => {});
    await new StatsPresenter().load((generatedViewModel) => {
      statsViewModel = generatedViewModel;
    });
  });

  it("should show bookCount", async () => {
    expect(statsViewModel.lastAddedBook).toBe("");
    expect(statsViewModel.bookCount).toBe(5);
  });

  it("should show last added book", async () => {
    await bookAdderTestHarness.addBook();
    expect(statsViewModel.lastAddedBook).toBe("UFT");
  });
});
