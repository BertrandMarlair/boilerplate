export const formatExternalError = err => {
    if (err.message) {
        console.log(err.message)
        const messageIndex = err.message.indexOf('"message"');
        const messageString = err.message.substring(
            messageIndex, 
            err.message
                .substring(messageIndex, err.message.length)
                .indexOf(',') + messageIndex
        )
            console.log(messageString   )
        const response = JSON.parse(`{${messageString}}`)
        return response.message
    } 
    return err
};