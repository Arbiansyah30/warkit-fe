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

export const formatRupiah = (number : number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(number);
  };