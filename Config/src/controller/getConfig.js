const getConfig = async (req, res) => {
    try {
        const neededEnd = JSON.parse(req.body).env
        let response = []
        if(neededEnd.length > 0){
            for(let i in neededEnd){
                const env = neededEnd[i]
                const localEnv = process.env[env]
                if(localEnv) {
                    response.push({name: env, value: process.env[env]})
                }
            }
            
            process.argv.forEach((val) => {
                if(val.includes("DOMAIN")) {
                    const domain = val.split("=")

                    response.push({name: "DOMAIN", value: domain[1]})
                }
                if(val.includes("CORS")) {
                    const cors = val.split("=")

                    response.push({name: "CORS", value: cors[1]})
                }
            });

    
            return res.status(200).send(response);
        }

        return res.status(401).send("fail to send env variables");
    } catch (err) {
        return res.status(401).send(err.message);
    }
};

export default getConfig;
