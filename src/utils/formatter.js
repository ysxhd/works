import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../constants/common';
/*
 *  @desc 格式化开始日期
 *  @param time 需要格式化日期
 *  @param type start OR end
 * */
export function startEndDate(time, type = 'start') {
    let suffix = type === 'start' ? ' 00:00:00' : ' 23:59:59';
    return time ? time + suffix : '';
}
// 日期
export function dateFormat(time) {
    return time ? moment(time).format(DATE_FORMAT) : '--';
}

// 日期+时间
export function dateTimeFormat(time) {
    return time ? moment(time).format(DATE_TIME_FORMAT) : '--';
}