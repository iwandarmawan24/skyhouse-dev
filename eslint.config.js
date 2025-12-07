// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["resources/js/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react,
            import: importPlugin,
        },
        settings: {
            "import/resolver": {
                vite: {
                    viteConfig: "./vite.config.js",
                },
            },
        },
        rules: {
            "import/no-unresolved": ["error", { caseSensitive: true }],
            "react/react-in-jsx-scope": "off",
        },
    },
];
