import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  q: parseAsInteger.withDefault(1),
  maxResults: parseAsInteger.withDefault(15),
});
