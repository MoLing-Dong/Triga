/* eslint-disable quotes */
<template>
  <el-row class="home" :gutter="20">
    <el-col
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 10 }"
      :xl="{ span: 8 }"
      style="margin-top: 20px"
    >
      <el-card shaow="hover"
        ><div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <P class="name">用户名：<span>Admin</span></P>
            <P class="access">权限组：<span>超级管理员</span></P>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间:<span> Timer</span></p>
          <p>上次登陆地点:<span> Place</span></p>
        </div></el-card
      >
      <el-card style="margin-top: 20px"> <word></word> </el-card>
    </el-col>
    <el-col
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 14 }"
      :xl="{ span: 16 }"
      style="margin-top: 20px"
    >
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <!-- <div style='height: 17.5rem' ref='echart'></div> -->
        <echart :chartData="echartData.order" style="height: 17.5rem"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 16.25rem">
          <echart :chartData="echartData.user" style="height: 15rem"></echart>
        </el-card>
        <el-card shadow="hover" style="height: 16.25rem">
          <echart
            :chartData="echartData.video"
            style="height: 15rem"
            :isAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// eslint-disable-next-line quotes
import { getHome } from "../../api/data";
import Echart from "@/components/ECharts.vue";
// import Word from "@/views/Tools/newWordYun.vue";

export default {
  name: "Home",
  components: { Echart },
  data() {
    return {
      userImg: require("../../assets/logo.png"),

      countData: [
        {
          icon: "success",
          color: "#2ec7c9",
        },
        {
          icon: "star-on",
          color: "#ffb980",
        },
        {
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          icon: "success",
          color: "#2ec7c9",
        },
        {
          icon: "star-on",
          color: "#ffb980",
        },
        {
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          
        },
      },
    };
  },
  methods: {
    getTableData() {
      getHome().then((res) => {
        this.countData = this.countData.map((item, index) => {
          return { ...item, ...res.data.countData[index] };
        });
        // 折线图的展示
        const order = res.data.orderData;
        const keyArray = Object.keys(order.data[0]);
        // const myEchartsOrder = echarts.init(this.$refs.echart);
        // myEchartsOrder.setOption(this.echartsData.order);
        // 传给组件的值
        this.echartData.order.xData = order.date;
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        }); // 用户图
        this.echartData.user.xData = res.data.userData.map((item) => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: res.data.userData.map((item) => item.new),
          type: "bar",
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map((item) => item.active),
          type: "bar",
        });
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie",
        });
      });
      // eslint-disable-next-line comma-dangle
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/home";
</style>
<style lang="less" scoped>
.graph {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
