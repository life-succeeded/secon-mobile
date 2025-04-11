export function fallback<T>(value: T | null | undefined, fallback: T) {
    return value ?? fallback
}
