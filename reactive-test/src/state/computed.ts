import { reactiveEffect, track, trigger } from '../core/effect';

export function computed<T>(getter: () => T) {
    let value: T;
    let dirty = true;

    const effect = () => {
        if (dirty) {
            value = getter(); // Only recompute if dirty
            dirty = false; // Reset dirty state after computing
        }
        return value;
    };

    const obj = {
        get value() {
            track(obj, 'value'); // Track the computed value
            return effect(); // Ensure the effect runs and returns the latest value
        },
    };

    // This reactive effect should react to the computed value changes
    reactiveEffect(() => {
        console.log("Reactive effect running...");
        // Whenever the getter runs, we mark the computed as dirty
        dirty = true; // Mark as dirty so it will recompute next time accessed
        trigger(obj, 'value'); // Notify dependents that the computed value has changed
    });

    return obj;
}
