const envSet: Set<string> = new Set(["itg", "dev", "tst"]);
const apiSet: Set<string> = new Set(["sales", "stocks", "product-search"]);

// Map of key = supported flag / val = Sets of allowed User input peer flag
const flagsMap = new Map<string, Set<string>>([
  ["--env", envSet],
  ["--api", apiSet],
]);

const checkForError = (flags: Array<string>, params: Array<string>) => {
  if (flags.length !== params.length)
    throw new Error("incorrect number of inputs");

  for (let i = 0; i < flags.length; i++) {
    if (!flagsMap.has(flags[i])) throw new Error("unknown flag: " + flags[i]);
    else if (!flagsMap.get(flags[i])?.has(params[i])) {
      throw new Error(`"${flags[i]} ${params[i]}" is unvalid.
            - Authorised value for env are: ${[...envSet.values()]}
            - Authorised value for api are: ${[...apiSet.values()]}
            `);
    }
  }
};

const buildEnvAndApiSet = (userParams: Array<string>): Array<Set<string>> => {
  let newEnvSet: Set<string> = new Set(
    userParams.filter((userParam) => envSet.has(userParam)),
  );
  let newApiSet: Set<string> = new Set(
    userParams.filter((userParam) => apiSet.has(userParam)),
  );

  if (newEnvSet.size === 0) newEnvSet = envSet;
  if (newApiSet.size === 0) newApiSet = apiSet;

  return [newEnvSet, newApiSet];
};

/**
 * parse the user inputs into envSet and apiSet and returns them
 * An error is thrown in case of insupported input
 * if no user input is found, a default envSet and apiSet containing all possibilitied for urls are returned
 * @return
 * [envSet, apiSet].
 * */
export const parseUserInput = (): Array<Set<string>> => {
  const inputs = process.argv.slice(2);

  if (inputs.length === 0) return [envSet, apiSet];

  // separating inputs into flags and params
  const flags: Array<string> = [];
  const params: Array<string> = [];

  for (let index = 0; index < inputs.length; index++) {
    index % 2 === 0 ? flags.push(inputs[index]) : params.push(inputs[index]);
  }
  // checking for invalid inputs
  checkForError(flags, params);
  // returning sets
  return buildEnvAndApiSet(params);
};
