import {request} from "graphql-request";
import getServiceUri from "./getServiceUri";

export default async (service, query) => {
    const response = await request(getServiceUri(service), query)
        .then(data => data)
        .catch(err => err);

    return response;
};
