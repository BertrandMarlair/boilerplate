const fetchMoreGQL = async (fetchMore) => {
    try {
        await fetchMore({
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) {
                    return prev;
                }
                return fetchMoreResult;
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export default fetchMoreGQL;
