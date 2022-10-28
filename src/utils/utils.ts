export function allValuesTruthy(object: Object) {
    return Object.values(object).every(v => v);
}