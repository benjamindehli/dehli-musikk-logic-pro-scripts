export function randomizeArray<T>(a: T[]): T[] {
    let b: number, c: number, d: T;
    c = a.length;
    while (c) {
        b = Math.trunc(Math.random() * c--);
        d = a[c];
        a[c] = a[b];
        a[b] = d;
    }
    return a;
}
