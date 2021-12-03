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
        is_completed: false,
        demo5_days_style: [],
    },

    onShow: function() {
        // displaying red dot on calendar icon

        var medDate = app.globalData.userData.med_date
        var tabList = this.getTabBar().data.list
        if (medDate.length != 0) {
            var today = new Date()
            var lastDate = new Date(app.globalData.userData.med_date[0])
        
            if (today.toDateString() != lastDate.toDateString()) {
                tabList[1].showRedDot = true
            } else {
                tabList[1].showRedDot = false
            }
        } else {
            tabList[1].showRedDot = true
        }

        // displaying red dot on moodtracking icon
        var last_questionare_week = app.globalData.userData.mood_track.mood_date[0];
        if (last_questionare_week == -1) {
            tabList[0].showRedDot = true
        } else {
            var currDate = new Date();
            var janOne = new Date(currDate.getFullYear(),0,1);
            var dayNum = Math.floor((currDate - janOne) / (24 * 60 * 60 * 1000));
            var curWeekNum = Math.ceil((currDate.getDay() + 1 + dayNum) / 7);
            if (curWeekNum == last_questionare_week) {
            tabList.showRedDot = false;
            } else {
            tabList.showRedDot = true;
            }
        }
        
        this.getTabBar().setData({
            list:tabList
        })

        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1,
            })
        }
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
        console.log("last med date");
        console.log(app.globalData.userData);
        var last_med_date = new Date(app.globalData.userData.med_date[0]);
        // console.log(last_med_date.getFullYear() + ", " + this.data.year);
        // console.log(last_med_date.getMonth() + ", " + (this.data.month - 1));
        // console.log(last_med_date.getDate() + ", " + this.data.day);
        // if today's medication task is finished, show the block "今日用药已完成"
        var is_completed = (last_med_date.getFullYear() == this.data.year 
                            && last_med_date.getMonth() == this.data.month - 1
                            && last_med_date.getDate() == this.data.day);
        this.setData({
            demo5_days_style,
            is_completed: is_completed
        });
        
    },

    // EventHandler linked to the sumbit button.
    // Effect: Sends a JSON to the database with information about
    //         the exact time of when the submit button is clicked
    onClick: function(res) {
        this.setData({
            is_completed: true
        });
        wx.showToast({
            title: '已完成今日用药',
            duration: 2000,
            mask: true,
            icon: 'success'
        })
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
            // console.log(res.result.data.med_date);
            // stores latest med_date array to global data
            app.globalData.userData.med_date = res.result.data.med_date;
            console.log(app.globalData.userData);
        });
    }
})