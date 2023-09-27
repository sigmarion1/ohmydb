import fetcher from "../utils/api";
import { fetcherWithParams } from "../utils/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const useImages = (index) => {
  const params = {
    page: index,
    ordering: "-id",
  };

  const { data, error } = useSWR(
    { url: "/api/images", params },
    fetcherWithParams
  );

  return {
    images: data?.results,
    next: data?.next,
    total: data?.count,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useImages;
