import globals from "globals";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/"],
  },
];
