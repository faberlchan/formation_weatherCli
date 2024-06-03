#! /usr/bin/env node 
import {exit, stdin, stdout} from "node:process"
import * as readline from "readline/promises"
import process from 'node:process';
// import got from 'got';


const  getUserInput = async (readerInterface: readline.Interface) : Promise<string> => {
    return await readerInterface.question("here is a rdm question: ")
}


const handleCtrlC = (readerInterface?: readline.Interface) => {
    console.log("gracefully closing the cli")
    // readerInterface.close();
    exit(1)
}

// Begin reading from stdin so the process does not exit.

process.on('SIGINT', () => {
  console.log('Received SIGINT. Process is not supposed to end');
  exit(1)
});


let i = 0
while(1) { 
    i++
    if (i === 10000000) 
        exit()
}

// (async () => {
//     process.stdin.on("SIGINT", handleCtrlC);
//     process.stdin.on("data", handleCtrlC);


//     return new Promise(async (res, rej) => {

//     console.log(process.env.APP_PRESENTATIONN);
//     const readerInterface = readline.createInterface(stdin, stdout);
    
//     try {
//         while(1) {            
//             const answer = await getUserInput(readerInterface);
//             console.log(`answer = ${answer}`);
//         }
//     } catch(e) {
//         console.log(`error is: ${e}`);
//     // } finally {
//     //     readerInterface.close();
//     }
// })})()
 
