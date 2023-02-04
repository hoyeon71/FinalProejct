/* 송장 번호 */
export function deliveryNumCheck(value) {
    return /[0123456789-]/g.test(value);
}