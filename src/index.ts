#! /usr/bin/env node 
import {stdin, stdout} from "node:process"
import * as readline from "readline/promises"

const  getUserInput = async (readerInterface: readline.Interface) : Promise<string> => {
    return await readerInterface.question("here is a rdm question: ")
}

(async () => {
    console.log(process.env.APP_PRESENTATIONN);
    const readerInterface = readline.createInterface(stdin, stdout);
    try {
        while(1) {            
            const answer = await getUserInput(readerInterface);
            console.log(`answer = ${answer}`);
        }
    } catch(e) {
        console.log(`error is: ${e}`);
    } finally {
        readerInterface.close();
    }
})()
 
