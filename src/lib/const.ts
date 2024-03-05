export const apiBaseURL =
  "https://c3po.crossfit.com/api/competitions/v2/competitions/open";

interface GenderMap {
  [key: number]: "M" | "F";
}

export const genderMap: GenderMap = {
  1: "M",
  2: "F",
};
