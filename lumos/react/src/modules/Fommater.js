/* 사업자 등록번호 */
export function bsrNumFomatter(value) {
    let str = value?.toString();
    return str?.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
}

/* 사업자 대표 번호 */
export function cpTelFomatter(value) {
    return value?.replace(/[^0-9]/g, '').replace(/^(\d{2})(\d{4})(\d{4})$/, `$1-$2-$3`);
}

/* 고객센터 번호 */
export function picTelFomatter(value) {
    return value?.replace(/[^0-9]/g, '').replace(/^(\d{2})(\d{4})(\d{4})$/, `$1-$2-$3`);
}

/* 주문자, 구매자, 개인정보보호책임자 휴대폰 번호 */
export function phoneFomatter(value) {
    return value?.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/* 날짜 형식 변환 (yyyy-MM-dd) */
export function dateFomatterlight(value) {
    return value.substring(0, 10);
}

/* 날짜 형식 변환 (yyyy-MM-dd hh:mm:ss) */
export function dateFomatter(value) {
    // ex : 2023-01-16T15:00:00.000+00:00 -> 2023-01-16 15:00:00
    return value.replace('T', ' ').replace(/\..*/, '');
}

/* [날짜 생성기] 날짜 변환기 */
function dateFomatterToSearch(newDay, today) {
    let year = newDay.getFullYear();
    let month = newDay.getMonth() + 1;
    let date = newDay.getDate();

    if(today) {
        const todayDate = today.getDate();

        if(date != todayDate) {
            if(month == 0) {
                year -= 1;
                month = (month + 11) % 12;
                date = new Date(year, month, 0).getDate();
            }
        }
    }

    month = ("0" + month).slice(-2);
    date = ("0" + date).slice(-2);

    return year + "-" + month + "-" + date;
}

/* [날짜 생성기] 오늘 */
export function dateCreatorToday() {
    let newDay = new Date();
    newDay = dateFomatterToSearch(newDay, new Date());
    return newDay;
}

/* [날짜 생성기] 1주일 */
export function dateCreatorWeek() {
    let newDay = new Date();
    newDay.setDate(newDay.getDate() - 7);
    newDay = dateFomatterToSearch(newDay, new Date());
    return newDay;
}

/* [날짜 생성기] 1개월 */
export function dateCreator1Month() {
    let newDay = new Date();
    newDay.setMonth(newDay.getMonth() - 1);
    newDay = dateFomatterToSearch(newDay, new Date());
    return newDay;
}

/* [날짜 생성기] 3개월 */
export function dateCreator3Months() {
    let newDay = new Date();
    newDay.setMonth(newDay.getMonth() - 3);
    newDay = dateFomatterToSearch(newDay, new Date());
    return newDay;
}

/* [날짜 생성기] 6개월 */
export function dateCreator6Months() {
    let newDay = new Date();
    newDay.setMonth(newDay.getMonth() - 6);
    newDay = dateFomatterToSearch(newDay, new Date());
    return newDay;
}