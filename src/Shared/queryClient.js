import { QueryClient } from "@tanstack/react-query";

const isTest = process.env.NODE_ENV === 'test'

const queryClient = new QueryClient({
  refetchOnWindowFocus: false,
  refetchOnmount: false,
  refetchOnReconnect: false,
  retry: isTest ? 0 : 3,
});

export default queryClient;
