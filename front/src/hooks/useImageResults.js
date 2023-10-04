import fetcher from "../utils/api";
import { fetcherWithParams, axiosFetcher } from "../utils/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const useImageResults = (testRecordId) => {
  const params = {
    ordering: "-id",
    limit: "100",
    test_record_id: testRecordId,
  };

  const { data, error } = useSWR(
    ["/api/image-results", params],
    ([url, params]) => axiosFetcher(url, params)
  );

  return {
    imageResults: data?.results,
    next: data?.next,
    total: data?.count,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useImageResults;
