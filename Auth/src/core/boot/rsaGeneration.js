import { generateKeyPairSync } from "crypto";

const rsaGeneration = async (passphrase) => {
    const {err, publicKey, privateKey} = await generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase
        }
    });

    if (err) {
        throw new Error("Fail to create key pair");
    }
    
    return {
        publicKey,
        privateKey,
    };
};

export default rsaGeneration;