import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  //The official sample configuration is copied here
  var option = {
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    legend: {
      data: ['Sales']
    },
    xAxis: {
      data: ["shirt", "Sweater", "Chiffon shirt", "pants", "High Heels", "sock"]
    },
    yAxis: {},
    series: [{
      name: 'Sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };
  chart.setOption(option);
  return chart;
}

function initLine(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd', 'e', 'f', '！']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: false
    }]
  };

  chart.setOption(option);
  return chart;
}

function initDom(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      indicator: [{
        name:'Food',
        max: 500
      },
      {
                 name:'Toy',
        max: 500
      },
      {
                 name:'Clothing',
        max: 500
      },
      {
                 name:'Picture Book',
        max: 500
      },
      {
                 name:'Medical',
        max: 500
      },
      {
                 name:'Tickets',
        max: 500
      }
      ]
    },
    series: [{
             name:'Budget vs overhead',
      type: 'radar',
      data: [{
        value: [430, 340, 500, 300, 490, 400],
                 name:'Budget'
      },
      {
        value: [300, 430, 150, 300, 420, 250],
                 name:'overhead'
      }
      ]
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
    ec:{
      onInit:initChart
    },
    ec_line: {
      onInit: initLine
    },
    ec_dom: {
      onInit: initDom
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
  onLoad: function(options) {

  },
})