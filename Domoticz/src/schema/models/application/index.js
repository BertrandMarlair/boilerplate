import ApplicationType from "./type/application";
import getAllApplications from "./query/getAllApplications";
import editApplication from "./mutation/editApplication";

export default {
    type: [
        ApplicationType,
    ],
    query: [
        getAllApplications,
    ],
    mutation: [
        editApplication,
    ]
};