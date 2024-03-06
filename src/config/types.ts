export interface Score {
  rank: number;
  time: number;
  scaled: number;
  scoreDisplay: string;
  breakdown: string;
}

export interface RawScore {
  [key: Score[keyof Score]]: number | string;
}

interface ScoreWithCount extends Score {
  count: number;
}

export interface ScoreMap {
  [key: string]: ScoreWithCount;
}

export interface CountMap {
  [key: number]: {
    count: number;
    firstRank: number;
  };
}

export interface MetaInfo {
  year: number;
  division: number;
  ordinal: number;
}
