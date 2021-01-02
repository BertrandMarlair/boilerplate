import getEnvironement from "./core/boot/getEnvironement";

console.log("Init Portal API");

getEnvironement().then(async () => {
    const main = await import("./main");
    
    main();
}).catch((err) => console.log(err));