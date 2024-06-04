import got from 'got'

const BASEURL = process.env.BASE_URL
const PROTOCAL = "https://"
const POSTURL = "/v1/version"

const getData = async (url: string) => {
    try {
        const res = await got
            .get(url)
            .json();
        return res
    } catch (e) {
        throw e
    }
}

const createUrl = (env: string, api: string): string => {
    return PROTOCAL + env + BASEURL + api + POSTURL
}

const callApi = (env: string, apiSet: Set<string>) => {
    apiSet.forEach((api) => 
        getData(createUrl(env, api)).then(console.log)
    )
} 

/**
 * get 
 * @param envSet set of env users wants to check
 * @param apiSet set of api users wants to check
 */
export const printApiVersion = async (envSet: Set<string>, apiSet: Set<string>) => {
    envSet.forEach((env) => callApi(env, apiSet) )
} 