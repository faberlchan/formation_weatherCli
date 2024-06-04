#! /usr/bin/env node

import { printApiVersion } from "./apiCalls.js";
import { parseUserInput } from "./parser.js";

try {
  const [envSet, apiSet]: Array<Set<string>> = parseUserInput();
  printApiVersion(envSet, apiSet);
} catch (e: unknown) {
  if (e instanceof Error) console.log(e.message);
}
