import { createReactive } from '../core/create-reactive';

export function reactive<T extends object>(target: T): T {
    return createReactive(target) as T;
}
