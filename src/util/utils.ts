export function toStyles(input: any): string {
    return Object.entries(input)
        .map(([key, value]) => `--${key}:${value}`)
        .join(';')
}