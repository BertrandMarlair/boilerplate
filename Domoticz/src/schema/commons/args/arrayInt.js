import { intArg } from "nexus";

export const requiredArrayInt = (opts) => {
    return intArg({ 
        ...opts,
        list: true,
    });
}