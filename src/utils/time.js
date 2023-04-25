export function dateFormat(value, format) {
    if (!value) return ''
    let dateObject = new Date();
    dateObject.setTime(value);
    let _format = format || 'yyyy-MM-dd HH:mm:ss';
    const date = {
        "M+": dateObject.getMonth() + 1,
        "d+": dateObject.getDate(),
        "H+": dateObject.getHours(),
        "h+": dateObject.getHours() <= 12 ? dateObject.getHours() : dateObject.getHours() - 12,
        "m+": dateObject.getMinutes(),
        "s+": dateObject.getSeconds(),
        "q+": Math.floor((dateObject.getMonth() + 3) / 3),
        "S+": dateObject.getMilliseconds()
    };
    if (/(y+)/i.test(_format)) {
        _format = _format.replace(RegExp.$1, (dateObject.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in date) {
        if (new RegExp("(" + k + ")").test(_format)) {
            _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return _format;
}


