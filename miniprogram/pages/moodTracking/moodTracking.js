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
  return month + "/" + day;
}

function getSaturday(d, week) {
  d = new Date(d);
  d.setDate(d.getDate() - (7 * week));
  var day = d.getDay(),
      diff = d.getDate() - day + 5; // adjust when day is sunday
      d.setDate(diff);
      var month = d.getUTCMonth() + 1; //months from 1-12
      var day = d.getUTCDate();
    return month + "/" + day;
}

function insertAt(array, index, ...elementsArray) {
  array.splice(index, 0, ...elementsArray);
}

function reverseArr(input) {
  var ret = new Array;
  for(var i = input.length-1; i >= 0; i--) {
      ret.push(input[i]);
  }
  return ret;
}

function initLine(canvas, width, height) {
  console.log("asdf");
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var dates = app.globalData.userData.mood_track.mood_date;
  var scores = app.globalData.userData.mood_track.mood_score;
  var currentWeek = dates[0];
  for (var i = 0; i < dates.length; i++) {
      if (currentWeek != dates[i]) {
        insertAt(dates, i, currentWeek);
        insertAt(scores, i, null);
      }
      currentWeek--;
  }
  var weeks =  []
  const currentDay = new Date();
  for (var i = 0; i < dates.length; i++) {
    //weeks.push(getSunday(currentDay, i) + "-" + getSaturday(currentDay, i));
    weeks.push(getSaturday(currentDay, i));
  }
  weeks = reverseArr(weeks);
  for (var i = 0; i < weeks.length; i++) {
    console.log(weeks[i]);
    //console.log(scores[i]);
  }
  //var dps = [];
  

    // for (var i = 0; i < weeks.length; i++)
    //   dps.push({
    //     x: weeks[i],
    //     y: scores[i],
    //     click: onClick
    //   });

  // function onClick(e){
	// 	alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );   
	// }
  canvas.onclick = function(evt){
    var activePoints = myLineChart.getElementsAtEvent(evt);
    // => activePoints is an array of points on the canvas that are at the same position as the click event.
  };
  var option = {
    // type: 'line',
    // labels: weeks,
    // data: {
    //   datasets: [{
    //     data: scores
    //   }]
    // }
    // legend: {
    //   type: scroll,
    // },
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
      formatter: 'Total Mood Score : {c}'
    },
    xAxis: {
      type: 'category',
      data: weeks,
      fontSize: 6,
    },
    yAxis: {
      type: 'value',
      axisLine: { onZero: false },
      axisLabel: {
        formatter: '{value}'
      },
      boundaryGap: true,
      data: ['0', '5', '10', '15', '20', '25'],
    },
    series: [{
      data: scores,
      type: 'line',
      connectNulls:true,
      markLine: {
        symbol:['none', 'none'],
        animation: false,
        lineStyle: {
          width: 0,
        },
        data: [
          [
            {
                name: '轻度抑郁',
                label: {
                  normal: {
                    show: true,
                    position: 'insideEndTop',
                    fontSize: 10,
                  }
                },
                coord: [0, 5]
            },
            {
              coord: [weeks.length-1, 5]
            }
          ],
          [
            {
                name: '中度抑郁',
                label: {
                  normal: {
                    show: true,
                    position: 'insideEndTop',
                    fontSize: 10,
                  }
                },
                coord: [0, 10]
            },
            {
              coord: [weeks.length-1, 10]
            }
          ],
          [
            {
                name: '中重度抑郁',
                label: {
                  normal: {
                    show: true,
                    position: 'insideEndTop',
                    fontSize: 10,
                  }
                },
                coord: [0, 15]
            },
            {
              coord: [weeks.length-1, 15]
            }
          ],
          [
            {
                name: '重度抑郁',
                label: {
                  normal: {
                    show: true,
                    position: 'insideEndTop',
                    fontSize: 10,
                  }
                },
                coord: [0, 20]
            },
            {
              coord: [weeks.length-1, 20]
            }
          ],
        ]
      },
    }],
   
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