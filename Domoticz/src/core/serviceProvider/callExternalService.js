import getServiceUri from "./getServiceUri";
import { GraphQLClient } from 'graphql-request'
 
export default async (service, query, token, headers = true) => {
  const graphQLClient = new GraphQLClient(getServiceUri(service), {
    headers: headers ? {
        "access-token": token
    } : {},
  })
 
  return await graphQLClient.rawRequest(query)
}
