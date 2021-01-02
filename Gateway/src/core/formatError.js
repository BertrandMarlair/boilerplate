export const formatError = err => {
    if (err.extensions.exception) {
        const error = err.extensions.exception;
        if(error.result && error.result.errors && error.result.errors.length > 0){
            return error.result.errors
        }else if (err.message) {
            if(err.message.startsWith("Unexpected error value: ")){
                const errorMessage = err.message
                    .replace('Expected Iterable,', 'Expected Iterable')
                    .replace(`'`, `\\'`);
                console.log(errorMessage)

                const messageIndex = errorMessage.indexOf("message");
                const messageString = errorMessage.substring(
                    messageIndex, 
                    errorMessage
                        .substring(messageIndex, errorMessage.length)
                        .indexOf('locations') + messageIndex - 2
                )
                    .replace('message', '"message"')

                const pathIndex = errorMessage.indexOf("path");
                const pathString = errorMessage.substring(
                    pathIndex, 
                    errorMessage
                        .substring(pathIndex, errorMessage.length)
                        .indexOf('],') + pathIndex
                ).replace('path', '"path"') + "]";

                const errorParse = `{${messageString}, ${pathString}}`;
                
                if (/^[\],:{}\s]*$/.test(errorParse.replace(/\\["\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    return JSON.parse(errorParse);
                }
                return messageString
            }
            const error = {
                message: err.message,
                path: err.path,
            }
            return error
        } else if(error.stacktrace.length > 0){
            const stacktrace = error.stacktrace[0].split('"')[1]
            
            if(stacktrace){
                if(error.stacktrace[0].includes("message")) {
                    return stacktrace
                }
                return error.stacktrace[0]
            }
            return error.stacktrace[0]
        }
        return error.stacktrace;
    }
};