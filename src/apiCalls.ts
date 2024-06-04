import got from 'got'
import {envKeys, ApiVersion} from 'types.js'

const BASE_URL: string | undefined = process.env.BASE_URL
const PROTOCOL: string = "https://"
const URL_V1: string = "/v1/version"
const URL: string  = "/version"

const urlRoute: Record<envKeys, string> = {
    itg: URL,
    dev: URL_V1,
    tst: URL_V1
}

function isApiVersion(apiVersion: unknown): apiVersion is ApiVersion {
    return (apiVersion as ApiVersion).version !== undefined;
}

const getData = async (url: string): Promise<{version: string}> => {
    try {
        const res = await got
            .get(url)
            .json();
        if (isApiVersion(res))
            return res
        throw new Error("invalid response type recieved")
    } catch (e) {
        throw e
    }
}

const createUrl = (env: envKeys, api: string): string => {
    const url = env === "tst" && api === "stocks" ? URL : urlRoute[env]
    
    return PROTOCOL + env + BASE_URL + api + url
}

const callApi = (env: envKeys, apiSet: Set<string>) => {
    apiSet.forEach((api) => 
        getData(createUrl(env, api))
        .then((res) => console.log(`${env} ${api} : ${JSON.stringify(res)}`))
        .catch(() => console.log(`error with ${createUrl(env, api)}`))
    )
} 

/**
 * get the asked for api versions and log them
 * @param envSet set of env users wants to check
 * @param apiSet set of api users wants to check
 */
export const printApiVersion = async (envSet: Set<string>, apiSet: Set<string>) => {
    if (BASE_URL === undefined)
        throw new Error("BASE_URL not found, pleaser make sure your .env is correctly set")
    envSet.forEach((env) => callApi(env as envKeys, apiSet) )
} 