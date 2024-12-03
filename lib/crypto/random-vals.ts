import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

export const getRandomValues = (length: number) => {
  const randomNums = new Uint8Array(length);

  crypto.getRandomValues(randomNums);

  const vals = encodeBase32LowerCaseNoPadding(randomNums);

  return vals;
};
