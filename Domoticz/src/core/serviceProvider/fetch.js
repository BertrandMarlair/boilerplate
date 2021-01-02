import getServiceUri from "./getServiceUri";

export default async (service, url, params = {}, method = "post") => {
    const response = await fetch(`${getServiceUri(service)}${url}`,  {  
        method, 
        body: JSON.stringify(params), 
        headers: { 'Content-Type': 'application/json' },
    })
        .then(data => data.json())
        .catch(err => err);


    return response;
};
