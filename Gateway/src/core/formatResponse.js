export const formatResponse = (response, {context}) => {
    context.memoizer.clear();

    return response;
};