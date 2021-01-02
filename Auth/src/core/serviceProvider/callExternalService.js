import getServiceUri from "./getServiceUri";
import { GraphQLClient } from 'graphql-request'
 
export default async (service, query, token, secret) => {
  const graphQLClient = new GraphQLClient(getServiceUri(service), {
    headers: {
        "access-token": token,
        "secret-token": secret,
    },
  })
 
  return await graphQLClient.rawRequest(query)
}
