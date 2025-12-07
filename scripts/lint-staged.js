#!/usr/bin/env node
import { ESLint } from "eslint";

const files = process.argv.slice(2);
const eslint = new ESLint({ overrideConfigFile: "./eslint.config.js", fix: true });

const results = await eslint.lintFiles(files);
await ESLint.outputFixes(results);
