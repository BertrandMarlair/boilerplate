import { queryType } from "nexus";

export default params => queryType({
    definition(field) {
        params.forEach(model => {
            model.query && model.query.forEach(query => {
                query(field)
            })
        })
    },
});