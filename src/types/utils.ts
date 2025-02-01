export function isNullOrUndefined(value: never): boolean {
    return value == null || typeof value === "undefined"
}