/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Dependency } from './dependency';

let activeEffect: Function | null = null;

export function track(target: object, prop: string | symbol) {
    const depsMap = getDependencyMap(target);
    if (!depsMap[prop]) {
        depsMap[prop] = new Dependency();
    }

    if (activeEffect) {
        depsMap[prop].depend(activeEffect);
    }
}

export function trigger(target: object, prop: string | symbol) {
    const depsMap = getDependencyMap(target);
    if (depsMap[prop]) {
        depsMap[prop].notify();
    }
}

const targetMap = new WeakMap<object, Record<string | symbol, Dependency>>();

function getDependencyMap(target: object) {
    if (!targetMap.has(target)) {
        targetMap.set(target, {});
    }
    return targetMap.get(target)!;
}

export function reactiveEffect(effect: Function) {
    activeEffect = effect;
    effect();
    activeEffect = null;
}
