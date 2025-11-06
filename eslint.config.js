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
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react,
            import: importPlugin,
        },
        rules: {
            "import/no-unresolved": ["error", { caseSensitive: true }],
            "react/react-in-jsx-scope": "off",
        },
    },
];
