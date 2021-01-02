import memoize from "memoizee";

export default class Memoizer {
    constructor() {
        this.store = new Map();
        this.mems = new Map();
    }

    memoize(fn, ...args) {
        this.mems.has(fn) ||
            this.mems.set(
                fn,
                memoize(fn, {
                    normalizer: givenArgs => JSON.stringify(givenArgs),
                }),
            );

        const mem = this.mems.get(fn);
        const argstring = JSON.stringify(args);

        this.store.set(
            mem,
            this.store.has(mem)
                ? [...this.store.get(mem), argstring]
                : [argstring],
        );

        return mem(...args);
    }

    clear() {
        Array.from(this.store.entries()).forEach(([mem, calls]) =>
            calls.forEach(args => mem.delete(...JSON.parse(args))),
        );
    }
}
