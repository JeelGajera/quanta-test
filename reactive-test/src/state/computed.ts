import { reactiveEffect, track } from '../core/effect';

export function computed<T>(getter: () => T) {
    let value: T;
    let dirty = true;

    // Wrap the getter in a reactive effect to track dependencies
    const effect = reactiveEffect(() => {
        value = getter();
        dirty = false; // Reset the dirty flag after computing
    });

    const obj = {
        get value() {
            if (dirty) {
                effect(); // Run the effect to compute the value if dirty
            }
            track(obj, 'value'); // Track access to the computed value
            return value;
        },
    };

    return obj;
}
