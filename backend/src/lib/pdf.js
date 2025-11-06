// import express from "express";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");


// export const extractData = async (file) => {
//   if (!file || !file.buffer) {
//     throw new Error("No file provided for extraction");
//   }

//   const dataBuffer = file.buffer;
//   const result = await pdfParse(dataBuffer);
//   return result.text;
// };


import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractData = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("No file provided for extraction");
  }
  const dataBuffer = file.buffer;
  const result = await pdfParse(dataBuffer);
  return result.text;
};
