import { QueryClient } from "@tanstack/react-query";

const isTest = process.env.NODE_ENV === "test";

const queryClient = new QueryClient({
  refetchOnWindowFocus: false,
  refetchOnmount: false,
  refetchOnReconnect: false,
  retry: isTest ? 0 : 3,
});

const testQueryClient = new QueryClient({
  refetchOnWindowFocus: false,
  refetchOnmount: false,
  refetchOnReconnect: false,
  retry: 0,
});

export default isTest ? testQueryClient : queryClient;
