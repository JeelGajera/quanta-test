import { reactiveEffect } from '../core/effect';

export function watch<T>(source: () => T, callback: (value: T) => void) {
    reactiveEffect(() => {
        const value = source();
        callback(value); // Run callback when source changes
    });
}
