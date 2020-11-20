export const get = (obj, attr) => obj?.hasOwnProperty(attr) ? obj[attr] : undefined;

export const deepReducer = f => (a, x, i) => {
    x[f] += get(a[i - 1], f) || 0;
    return [...a, x];
};
