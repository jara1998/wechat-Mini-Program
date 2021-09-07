// pages/index.js
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        year: new Date().getFullYear(),      // 年份
        month: new Date().getMonth() + 1,    // 月份
        day: new Date().getDate(),
        str: MONTHS[new Date().getMonth()],  // 月份字符串
        weekday: WEEKDAYS[new Date().getDay()], // 星期几

        demo5_days_style: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const days_count = new Date(this.data.year, this.data.month, 0).getDate();

        let demo5_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
            const date = new Date(this.data.year, this.data.month - 1, i);
            if (date.getDay() == 0) {
                demo5_days_style.push({
                    month: 'current', day: i, color: '#f488cd'
                });
            } else {
                demo5_days_style.push({
                    month: 'current', day: i, color: '#a18ada'
                });
            }
        }
        demo5_days_style.push({ month: 'current', day: this.data.day, color: 'white', background: '#b49eeb' });

        this.setData({
            demo5_days_style
        });
        
    },

    // EventHandler linked to the sumbit button.
    // Effect: Sends a JSON to the database with information about
    //         the exact time of when the submit button is clicked
    onClick: function(res) {
        var today = new Date();
        // console.log("old med date");
        // console.log(app.globalData.data.med_date);
        wx.cloud.callFunction({
            name: 'medication_track',
            data: {
                date: today
            }
        })
        .then(res => {
            console.log("new med_date data");
            console.log(res.result.data.med_date);
            // stores latest med_date array to global data
            app.globalData.data.med_date = res.result.data.med_date;
            console.log(app.globalData.data);
        });

    }
})