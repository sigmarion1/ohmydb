import fetcher from "../utils/api";
import { fetcherWithParams } from "../utils/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import { axiosFetcher } from "../utils/api";
const useClassifier = () => {
  const params = {
    ordering: "-id",
    limit: "100",
  };

  const { data, error } = useSWR(
    ["/api/classifiers", params],
    ([url, params]) => axiosFetcher(url, params)
  );

  return {
    classifiers: data?.results,
    next: data?.next,
    total: data?.count,
    isLoading: !error && !data,
    isError: error,
    data,
  };
};

export default useClassifier;
