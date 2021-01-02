import { mutationType } from "nexus";

export default params => mutationType({
    definition(field) {
        params.forEach(model => {
            model.mutation && model.mutation.forEach(mutation => {
                mutation(field)
            })
        })
    },
});