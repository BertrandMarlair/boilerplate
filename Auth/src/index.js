import getEnvironement from "./core/boot/getEnvironement";

console.log("Init Authentification service");

getEnvironement().then(async () => {
    const main = await import("./main");
    
    main()
}).catch((err) => console.log(err));