export const dateToDayofWeek = (dateString) => {
    /* 2022/31/08--->水 */
    var newDate=dateString.split("/")
    var year=newDate[0]
    var month=newDate[1]
    var day=newDate[2]
        const weekday = ["日", "月", "火", "水", "木", "金", "土"];
        return weekday[new Date(`${month}/${day}/${year}`).getDay()];
    }