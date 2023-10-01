import fetcher from "../utils/api";
import { fetcherWithParams } from "../utils/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const useTestRecords = (testSetId) => {
  const params = {
    ordering: "-id",
    limit: "100",
    test_set_id: testSetId,
  };

  const { data, error } = useSWR(
    { url: "/api/test-records", params },
    fetcherWithParams
  );

  return {
    testRecords: data?.results,
    next: data?.next,
    total: data?.count,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTestRecords;
