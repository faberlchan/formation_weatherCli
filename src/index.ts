#! /usr/bin/env node 

import { printApiVersion } from './apiCalls.js'
import { parseUserInput } from './parser.js'

// todo : esLint, prettier
// todo commonJs got 11.8.0
// base url should be in a .env 



try {
    const [envSet, apiSet]: Array<Set<string>>  = parseUserInput()
    printApiVersion(envSet, apiSet)

} catch (e: unknown) {
    if (e instanceof Error)
        console.log(e.message)
}
