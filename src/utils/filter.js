import Vue from 'vue';
import time from './time';

Vue.filter('time', function (value, format) {
    if (!value) return '';
    let _format = format || 'yyyy-MM-dd HH:mm:ss';
    let date = new Date();
    date.setTime(value);
    return time.dateFormat(date, _format);
  })

  Vue.filter('sex', function (value) {
    if (!value) return ''
    let newValue = '';
    switch(value) {
      case 0:
        newValue = '未知';
        break;
      case 1:
        newValue = '男';
        break;
      case 2:
        newValue = '女';
        break;
    }
    return newValue;
  })

  Vue.filter('card', function(value) {
    if (!value) return ''
    let newValue = '';
    switch(value) {
      case 1:
        newValue = '手机蓝牙';
        break;
      case 2:
        newValue = '蓝牙卡';
        break;
      case 4:
        newValue = 'IC卡';
        break;
      case 8:
        newValue = '临时通行';
        break;
    }
    return newValue;
  })
