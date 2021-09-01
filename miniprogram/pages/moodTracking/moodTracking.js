import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initLine(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      data: ['第一周', '第二周', '第三周', '第四周']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [7, 6, 5, 4],
      type: 'line',
      smooth: false
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
       * The initial data of the page
   */
  data: {
    ec_line: {
      onInit: initLine
    },
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