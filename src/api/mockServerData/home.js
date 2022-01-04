// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 800, 0, 0),
          vivo: Mock.Random.float(100, 800, 0, 0),
          oppo: Mock.Random.float(100, 800, 0, 0),
          魅族: Mock.Random.float(100, 800, 0, 0),
          三星: Mock.Random.float(100, 800, 0, 0),
          小米: Mock.Random.float(100, 800, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        //订单
        countData: [{
            name: "今日支付订单",
            value: 1234,

          },
          {
            name: "今日收藏订单",
            value: 210,
          },
          {
            name: "今日未支付订单",
            value: 1234,
          },
          {
            name: "本月支付订单",
            value: 1234,
          },
          {
            name: "本月收藏订单",
            value: 210,
          },
          {
            name: "本月未支付订单",
            value: 1234,
          },
        ],
        // 饼图
        videoData: [{
            name: '小米',
            value: 2999
          },
          {
            name: '苹果',
            value: 5999
          },
          {
            name: 'vivo',
            value: 1500
          },
          {
            name: 'oppo',
            value: 1999
          },
          {
            name: '魅族',
            value: 2200
          },
          {
            name: '三星',
            value: 4500
          }
        ],
        // 柱状图
        userData: [{
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
          },
        //表
        
      }
    }
  }
}
