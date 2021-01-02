import getEnvironement from "./core/getEnvironement";
console.log("Init API GateWay")

getEnvironement().then(async () => {
    const main = await import("./main");
    
    main.default();
}).catch((err) => console.log(err));