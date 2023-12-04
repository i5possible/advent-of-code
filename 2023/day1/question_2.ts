import { readLines } from "../../fileUtils";
import { logger } from "../../utils/logger";

const lines = readLines("./input.txt");

const map: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const keys = Object.keys(map);
const first = lines
  .map((lineStr, index) => {
    let firstKey = "";
    let firstIndex = 9999999999;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const cur = lineStr.indexOf(key);
      if (cur !== -1 && cur < firstIndex) {
        firstIndex = cur;
        firstKey = key;
      }
    }
    for (let i = 0; i < firstIndex; i++) {
      const cur = parseInt(lineStr[i]);
      if (cur >= 1 && cur <= 9) {
        logger.info(cur);
        return cur;
      }
    }
    logger.info(lineStr, firstKey, map[firstKey]);
    return map[firstKey];
  })
  .reduce((acc, cur) => {
    return acc + cur * 10;
  }, 0);

const last = lines
  .map((lineStr, index) => {
    let lastKey = "";
    let lastIndex = -1;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const cur = lineStr.lastIndexOf(key);
      if (cur !== -1 && cur > lastIndex) {
        lastIndex = cur;
        lastKey = key;
      }
    }
    for (let i = lineStr.length - 1; i > lastIndex; i--) {
      const cur = parseInt(lineStr[i]);
      if (cur >= 1 && cur <= 9) {
        logger.info(cur);
        return cur;
      }
    }
    logger.info(lineStr, lastKey, map[lastKey]);
    return map[lastKey];
  })
  .reduce((acc, cur) => acc + cur, 0);

// 53868
console.log(first + last);
