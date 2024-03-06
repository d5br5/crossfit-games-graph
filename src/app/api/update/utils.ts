import { apiBaseURL } from "@/src/config/const";

export const getApiURL = (
  year: number,
  division: string,
  page: number
): string => {
  return `${apiBaseURL}/${year}/leaderboards?division=${division}&page=${page}`;
};

interface FilterItem {
  name: string;
  isNum?: boolean;
}

export const convertElem = (elem: any, filter: FilterItem[]) => {
  const newItem: any = {};
  filter.forEach((f) => {
    const key = f.name;
    let value = elem[key];
    if (f.isNum) {
      const numberdValue = Number(value);
      const isNumber = !isNaN(numberdValue);
      value = isNumber ? numberdValue : 0;
    }
    newItem[key] = value;
  });
  return newItem;
};
