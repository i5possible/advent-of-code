import { appendFileSync, readFileSync } from "fs";
import * as path from "path";

export const readLines = (fileName: string, splitter = /\r?\n/): string[] => {
  try {
    const absolutePath = path.resolve("", fileName);
    const data = readFileSync(absolutePath, "utf-8");
    const lines = data.split(splitter);
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }
    return lines;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const readData = (fileName: string): string => {
  try {
    const absolutePath = path.resolve("", fileName);
    return readFileSync(absolutePath, "utf-8");
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const appendToFile = (fileName: string, data: string) => {
  try {
    const absolutePath = path.resolve(__dirname, fileName);
    appendFileSync(absolutePath, data);
  } catch (err) {
    console.error(err);
  }
};
