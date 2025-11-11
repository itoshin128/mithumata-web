import eslint from "@eslint/js"
import tseslint from "typescript-eslint"

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [".next/*", "node_modules/*", "out/*", ".cache/*"],
  },
  {
    rules: {
      "no-console": ["warn", {
        "allow": ["warn", "error"]
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
]
