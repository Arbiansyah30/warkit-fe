export function searchParamsToObject(
    searchParams: string
): Record<string, string> {
    const params = new URLSearchParams(searchParams);
    const obj: Record<string, string> = {};
    for (const [key, value] of params) {
        obj[key] = value;
    }
    return obj;
}
