#! /usr/bin/env node 
import {argv, stdin, stdout} from "node:process"
import * as readline from "readline/promises"

console.log("")
console.log(`this is the users input  ${argv}`)


while(1) {
    try {
        const rl = readline.createInterface(stdin, stdout)
        const answer = await rl.question("here is a rdn question ")
        console.log(`answer = ${answer}`)    
        rl.close();
    } catch(e) {
        console.log()
    }
}
