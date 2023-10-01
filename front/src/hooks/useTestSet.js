import fetcher from "../utils/api";
import { fetcherWithParams } from "../utils/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const useTestSet = () => {
  const params = {
    ordering: "-id",
    limit: "100",
  };

  const { data, error } = useSWR(
    { url: "/api/test-sets", params },
    fetcherWithParams
  );

  return {
    testSets: data?.results,
    next: data?.next,
    total: data?.count,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTestSet;
