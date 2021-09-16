import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // app.globalData.userData.med_date
  // var date = new Date(app.globalData.userData.med_date[0])
  //The official sample configuration is copied here
  var option = {
    title: {
      text: '服药周期图表'
    },
    tooltip: {},
    xAxis: {
      data: ["2月", "3月", "4月", "5月", "6月", "7月"]
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
          value: 25,
          itemStyle: { color: get_color(25, false) },
        },
        {
          value: 30,
          itemStyle: { color: get_color(30, false) },
        },
        {
          value: 27,
          itemStyle: { color: get_color(27, false) },
        },
        {
          value: 30,
          itemStyle: { color: get_color(30, false) },
        },
        {
          value: 20,
          itemStyle: { color: get_color(20, false) },
        },
        {
          value: 28,
          itemStyle: {
            color: get_color(28, true),
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#979797'
            },
            formatter: currMonthLabel(28)
          }
        }
      ],
    }],
    color: ['#B8DDC8']
  };
  chart.setOption(option);
  return chart;
}

function currMonthLabel (value) {
  return value + "天";
}

function get_color(value, currentMonth) {
  if (currentMonth) {
    return '#00960F'
  }
  if (value <= 20) {
    return '#FAEDC5'
  }
  return '#B8DDC8'
}
Page({

  /**
       * The initial data of the page
   */
  data: {
    ec: {
      onInit: initChart
    }


  },

  /**
       * Life cycle function-monitor page loading
   */
  onLoad: function (options) {
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.getOneOption();
  },
  /**
       * Life cycle function-monitor page loading
   */
  onLoad: function (options) {

  },
})