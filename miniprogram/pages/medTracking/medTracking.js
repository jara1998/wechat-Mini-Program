import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function getSunday(d, week) {
  d = new Date(d);
  d.setDate(d.getDate() - (7 * week));
  var day = d.getDay(),
    diff = d.getDate() - day - 1; // adjust when day is sunday
    console.log(d);

    d.setDate(diff);
    var month = d.getUTCMonth() + 1; //months from 1-12
    var day = d.getUTCDate();
  return month + "." + day;
}

function getSaturday(d, week) {
  d = new Date(d);
  d.setDate(d.getDate() - (7 * week));
  var day = d.getDay(),
      diff = d.getDate() - day + 5; // adjust when day is sunday
      d.setDate(diff);
      var month = d.getUTCMonth() + 1; //months from 1-12
      var day = d.getUTCDate();
    return month + "." + day;
}

function getWeek(currentDay) {
  var d = new Date(d);
  var week = -1;
  while (currentDay < d) {
    d.setDate(d.getDate() - 7);
    var day = d.getDay(),
    diff = d.getDate() - day + 5; // adjust when day is sunday
    d.setDate(diff);
    week++;
  }
  return week;
}

function makeArrays(weeks, scores) {
  const allDates = app.globalData.userData.med_date;
  var today = new Date();
  for (var i = 24; i >= 0; i--) {
    weeks[i] = getSunday(today, i) + "-" + getSaturday(today, i);
    scores[i] = 0;
  }
  for (var i = 0; i < allDates.length; i++) {
    var date = new Date(allDates[i]);
    scores[getWeek(date)]++;
  }
}


function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  const allDates = app.globalData.userData.med_date;
  var perMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
  console.log(allDates)
  for (var i = 0; i < allDates.length; i++) {
    var date = new Date(allDates[i]);
    var month = date.getMonth();
    perMonth[month] = perMonth[month] + 1;
  }
  console.log(perMonth);
  //The official sample configuration is copied here
  var option = {
    title: {
      text: '服药周期图表'
    },
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
      confine: true,
      formatter: function(params) {
        var score = params[0].value;
        if (typeof score == 'undefined') {
          return null;
        }
        return score + "天";
      }
    },
    xAxis: {
      data: [(currMonth(-5) + 1) +"月", (currMonth(-4) + 1) +"月", (currMonth(-3) + 1) +"月",(currMonth(-2) + 1) + "月",(currMonth(-1) + 1) + "月", (currMonth(0) + 1) +"月"]
    },
    yAxis: 
      [
        {
          name: '天'
        }
      ],
    series: [{
      type: 'bar',
      data: [
        {
          value: perMonth[currMonth(-5)],
          itemStyle: { color: get_color(perMonth[currMonth(-5)], false) },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },
        },
        {
          value: perMonth[currMonth(-4)],
          itemStyle: { color: get_color(perMonth[currMonth(-4)], false) },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },
        },
        {
          value: perMonth[currMonth(-3)],
          itemStyle: { color: get_color(perMonth[currMonth(-3)], false) },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },
        },
        {
          value: perMonth[currMonth(-2)],
          itemStyle: { color: get_color(perMonth[currMonth(-2)], false) },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },
        },
        {
          value: perMonth[currMonth(-1)],
          itemStyle: { color: get_color(perMonth[currMonth(-1)], false) },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },
        },
        {
          value: perMonth[currMonth(0)],
          itemStyle: {
            color: get_color(perMonth[currMonth(0)], true),
          },
          // value: 30,
          // itemStyle: { color: get_color(30, false) },

          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#979797'
            },
            formatter: currMonthLabel(perMonth[currMonth(0)])
          }
        }
      ],
    }],
    color: ['#B8DDC8']
  };
  chart.setOption(option);
  return chart;
}

function currMonth(index) {
  var today = new Date();
  var month = today.getMonth()
  month = month + index;
  if (month < 0) {
    month = 12 + month;
  }
  return month;
}

function currMonthLabel (value) {
  return value + "天";
}

function get_color(value, currentMonth) {
  if (currentMonth) {
    if (value <= 20) {
      return "#f2c94c"
    }
    return '#00960F'
  }
  if (value <= 20) {
    return '#FAEDC5'
  }
  return '#B8DDC8'
}

function data_object(userInfo) {
  const allDates = app.globalData.userData.med_date;
  var curr_day = new Date();
  const total_days = curr_day - app.globalData.userData.reg_time;
  var perMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
  var sum = 0;
  console.log(allDates)
  for (var i = 0; i < allDates.length; i++) {
    var date = new Date(allDates[i]);
    var month = date.getMonth();
    perMonth[month] = perMonth[month] + 1;
    sum++;
  }


  var person = {
    curr: perMonth[0],
    comp_prev: perMonth[0] - perMonth[1],
    avg: sum/total_days,
  };
  return person;
}

Page({
  updateData: function (){
    var pages=getCurrentPages();
    var prevPage=pages[pages.length-2];
    this.setData({
         userData: prevPage.data.medData
     })

  },
  /**
       * The initial data of the page
   */
  data: {
    ec: {
      onInit: initChart
    },

    userData: {},

  },

  /**
       * Life cycle function-monitor page loading
   */

  /**
       * Life cycle function-monitor page loading
   */
  onLoad: function(){
   this.updateData()
  }
})