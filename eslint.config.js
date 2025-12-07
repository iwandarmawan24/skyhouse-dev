// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
                alias: {
                    map: [
                        ["@", path.resolve(__dirname, "./resources/js")],
                        ["@css", path.resolve(__dirname, "./resources/css")],
                    ],
                    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
                },
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
        rules: {
            "import/no-unresolved": ["error", {
                caseSensitive: true,
                ignore: [
                    "^swiper",
                    "^@radix-ui",
                    "^@headlessui",
                    "^@heroicons",
                    "^@inertiajs",
                    "^@tiptap",
                    "^lucide-react",
                ]
            }],
            "react/react-in-jsx-scope": "off",
            "no-unused-vars": "warn",
        },
    },
];
