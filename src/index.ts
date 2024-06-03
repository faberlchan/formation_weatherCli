#! /usr/bin/env node 

import got from 'got'


// todo commonJs got 11.8.0
// error
// base url should be in a .env 

const apiUrl: string = "https://itg.geoapi.hermes.com/sales/version"

const getData = async () => {
    try {
        const res = await got
            .get(apiUrl)
            .json();
        return res
    } catch (e) {
        console.log(e)
    }
}

// const dataVersion = getData().then(console.log)

// interface urlParams{
//     env: string, 
//     api: string,
// } 

// Sets of allowed User input

const flagsMap = new Map<string, Set<string>>([
    ["--env", new Set(["dev"])], 
    ["--api", new Set(["sales", "stocks", "product-search"])]
]);

const doesArrContainsSetElements = (arrToCheck: Array<string>, knownSet: Set<string>): boolean => {
    for (let element of arrToCheck) {
        if (!knownSet.has(element))
            return false
    }
    return true
}  

const checkForError = (flags: Array<string>, params: Array<string>) => {
    if (flags.length !== params.length)
        throw new Error("incorrect number of inputs")
    
    for (let i = 0; i < flags.length; i++) {
        if (!flagsMap.has(flags[i]))
            throw new Error("unknown flag: " + flags[i])
        else if (!flagsMap.get(flags[i])?.has(params[i])){
            throw new Error(`${params[i]} is unvalid for ${flags[i]}.`)
        }
    }
} 

const parseUserInput = () => {
    const inputs = process.argv.slice(2);

    if (inputs.length === 0)
        return 
    // separating inputs into flags and params
    const flags: Array<string> = []
    const params: Array<string> = []

    for (let index = 0; index < inputs.length; index++) {
        index % 2 === 0 ? flags.push(inputs[index]) : params.push(inputs[index])
    }   
    // checking for invalid inputs      
    checkForError(flags, params)
}

try {
    parseUserInput()
} catch (e: any) {
    console.log(e)
}
