import { DATA_TYPE, apiBaseURL } from "./const";

export const getApiURL = (
  year: number,
  division: string,
  page: number
): string => {
  return `${apiBaseURL}/${year}/leaderboards?division=${division}&page=${page}`;
};

interface FilterItem {
  name: string;
  type: string;
}

export const convertElem = (elem: any, filter: FilterItem[]) => {
  const newItem: any = {};
  filter.forEach((f) => {
    const key = f.name;
    let value = elem[key];
    if (f.type === DATA_TYPE.NUM) {
      const numberdValue = Number(value);
      const isNumber = !isNaN(numberdValue);
      value = isNumber ? numberdValue : 0;
    }
    newItem[key] = value;
  });
  return newItem;
};
