// Install Prettier Package
// npm install --save-dev prettier
// npm install --save-dev @types/prettier

import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

export const format = (code: string) => {
  const formatedJsxString = prettier.format(code, {
    parser: "babel",
    plugins: [babel],
    semi: false,
    printWidth: 80,
  });
  //   replace semicolon @ first index of string
  const string = formatedJsxString.replace(/;/, "");
  return string;
};
