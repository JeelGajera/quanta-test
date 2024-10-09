import { track, trigger } from './effect';

export function createReactive(target: { [key: string]: any }) {
    return new Proxy(target, {
        get(obj, prop, receiver) {
            const result = Reflect.get(obj, prop, receiver);
            track(obj, prop); // Track dependencies
            return typeof result === 'object' && result !== null
                ? createReactive(result) // Make nested objects reactive
                : result;
        },
        set(obj, prop, value, receiver) {
            const oldValue = obj[String(prop)];
            const result = Reflect.set(obj, prop, value, receiver);
            if (oldValue !== value) {
                trigger(obj, prop); // Trigger updates on change
            }
            return result;
        },
    });
}
