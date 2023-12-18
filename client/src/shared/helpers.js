export const strToPrice = (str) => {
    const num = Number(str);
    const options = { style: "currency", currency: "KES" };

    const numberFormat = new Intl.NumberFormat("en-US", options);

    return numberFormat.format(num);
}