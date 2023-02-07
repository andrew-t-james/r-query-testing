import { QueryClientProvider } from "@tanstack/react-query";
import StatsComponent from "./Stats";
import AddBooksComponent from "./AddBook";
import BookListComponent from "./Books";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./Shared/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-row-container">
        <div className="flex-row-item">
          <AddBooksComponent />
        </div>
        <div className="flex-row-item">
          <StatsComponent />
        </div>
        <div className="flex-row-item">
          <BookListComponent />
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
