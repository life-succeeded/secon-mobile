export function fallback<T>(value: T | null | undefined, fallback: T) {
    return value ?? fallback
}

export function range(length: number) {
    return Array.from(Array(length).keys())
}
