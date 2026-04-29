// eslint.config.mjs
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules", "dist", "build", ".vite", "coverage"]
  },

  // 🌐 Base JS/TS config
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },

  // ⚛️ Frontend
  {
    files: ["frontend/**/*.{js,ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  }
];