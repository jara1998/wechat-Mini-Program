const app = getApp();

Page({

    data: {
      pageNum: 0,
    },

    toPrevPage: function() {
      let num; 

      if (this.data.pageNum != 0) {
        num = this.data.pageNum - 1;
      } else {
        num = 0;
      }

      this.setData({
        pageNum: num
      });
    },

    toNextPage: function() {

      let num; 

      if (this.data.pageNum != 7) {
        num = this.data.pageNum + 1;
      } else {
        num = 7;
      }

      this.setData({
        pageNum: num
      });

    },
})