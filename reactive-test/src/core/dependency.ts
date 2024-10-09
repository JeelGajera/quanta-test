/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export class Dependency {
    [x: string]: any;
    private subscribers: Set<Function>;

    constructor() {
        this.subscribers = new Set();
    }

    depend(callback: Function | null) {
        if (callback) {
            this.subscribers.add(callback);
        }
    }

    notify() {
        this.subscribers.forEach((sub) => sub());
    }
}
