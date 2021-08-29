// pages/index.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
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

        demo1_days_style: [],
        demo2_days_style: [],
        demo4_days_style: [],
        demo5_days_style: [],
        demo6_days_style: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const days_count = new Date(this.data.year, this.data.month, 0).getDate();
        let demo1_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
            if (parseInt(Math.random() * 100) > 50) {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#8497ee'
                });
            } else {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white'
                });
            }
        }
        this.setData({
            demo1_days_style
        });

        let demo2_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
            if (i == 12) {
                demo2_days_style.push({
                    month: 'current', day: i, color: '#314580', background: '#ffed09'
                });
            } else if (i == 16) {
                demo2_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#30558c'
                });
            } else if (i == 21) {
                demo2_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#3c5281'
                });
            } else {
                demo2_days_style.push({
                    month: 'current', day: i, color: 'white'
                });
            }
        }
        this.setData({
            demo2_days_style
        });

        let demo4_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
                demo4_days_style.push({
                    month: 'current', day: i, color: 'white'
                });
        }
        this.setData({
            demo4_days_style
        });

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
        // demo5_days_style.push({ month: 'current', day: 12, color: 'white', background: '#b49eeb' });
        // demo5_days_style.push({ month: 'current', day: 17, color: 'white', background: '#f5a8f0' });
        // demo5_days_style.push({ month: 'current', day: 20, color: 'white', background: '#aad4f5' });
        // demo5_days_style.push({ month: 'current', day: 25, color: 'white', background: '#84e7d0' });

        this.setData({
            demo5_days_style
        });

        let demo6_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
            const date = new Date(this.data.year, this.data.month - 1, i);
            if (i == 12) {
                demo6_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#b49eeb'
                });
            } else if (i == 17) {
                demo6_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#f5a8f0'
                });
            } else if (i == 21) {
                demo6_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#aad4f5'
                });
            } else if (i == 25) {
                demo6_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#84e7d0'
                });
            } else {
                demo6_days_style.push({
                    month: 'current', day: i, color: 'black'
                });
            }
        }

        this.setData({
            demo6_days_style
        });
    },

    // this should be linked to an button, need to be renamed
    dayClick: function(res) {
        // var date = {
        //     year: res.detail.year,
        //     month: res.detail.month,
        //     day: res.detail.day
        // }
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
            // console.log("new med_date data");
            // console.log(res.result);
            // stores latest med_date array to global data
            app.globalData.data.med_date = res.result.data.med_date;
            // console.log(app.globalData.data);
        });
        // var demo5_days_style = this.data.demo5_days_style;
        // demo5_days_style.push({
        //     month: 'current', day: today.getDay(), color: 'white', background: '#84e7d0'
        // })
        // console.log(today.getDay());
        // this.setData({
        //     demo5_days_style
        // })
    }
})