import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-config-prettier";

export default [
	{
		languageOptions: {
			parser: "@typescript-eslint/parser",
			parserOptions: { ecmaVersion: "latest", sourceType: "module" },
		},
		plugins: { "@typescript-eslint": tsPlugin, prettier: prettierPlugin },
		rules: { "prettier/prettier": "error" },
	},
];
