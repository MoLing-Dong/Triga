<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <el-form class="bform" ref="form" :model="form" label-width="10px">
            <el-form-item label=""
              ><el-input
                type="email"
                v-model="form.useremail"
                placeholder="邮箱"
              ></el-input
            ></el-form-item>
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <el-form-item label=""
              ><el-input
                type="password"
                v-model="form.userpwd"
                placeholder="密码"
              ></el-input
            ></el-form-item>
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </el-form>
          <el-button class="bbutton" @click="login">登录</el-button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <el-form class="bform" ref="form" :model="form" label-width="20px"
            ><el-form-item label="">
              <el-input
                type="text"
                v-model="form.username"
                placeholder="账号"
              ></el-input
            ></el-form-item>
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <el-form-item label=""
              ><el-input
                type="email"
                v-model="form.useremail"
                placeholder="邮箱"
              ></el-input
            ></el-form-item>
            <el-form-item label=""
              ><el-input
                type="password"
                v-model="form.userpwd"
                placeholder="密码"
              ></el-input
            ></el-form-item>
          </el-form>
          <el-button class="bbutton" @click="register">注册</el-button>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-register",
  data() {
    return {
      isLogin: true,
      emailError: false,
      passwordError: false,
      existed: false,
      form: {
        username: "",
        useremail: "",
        userpwd: "",
      },
    };
  },
  created() {
    let _this = this;
    document.onkeydown = function (e) {
      e = window.event || e;
      if (
        _this.$route.path == ("/login" && "/") &&
        (e.key == "Enter" || e.key == "enter")
      ) {
        //验证在登录界面和按得键是回车键enter
        if (_this.isLogin == true) {
          _this.login("loginForm"); //登录函数
        } else {
          _this.register("reginsterFrom");
        }
      }
    };
  },
  methods: {
    openVn(info) {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", null, `${info}`)]),
      });
    },
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.username = "";
      this.form.useremail = "";
      this.form.userpwd = "";
    },
    checkMail(email) {
      const emreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return emreg.test(email);
    },
    login() {
      const self = this;
      if (self.form.useremail != "" && self.form.userpwd != "") {
        self
          .$axios({
            method: "post",
            url: "http://127.0.0.1:10520/login",
            data: {
              email: self.form.useremail,
              password: self.form.userpwd,
            },
          })
          .then((res) => {
            switch (res.data) {
              case 0:
                alert("登陆成功！");
                this.$router.push("/admin");
                break;
              case -1:
                this.emailError = true;
                this.openVn("邮箱错误");
                break;
              case 1:
                this.passwordError = true;
                this.openVn("密码错误");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.openVn("请完整输入账号密码 ");
      }
    },

    register() {
      const self = this;
      if (
        self.checkMail(self.form.useremail) &&
        self.form.username != "" &&
        self.form.userpwd != ""
      ) {
        console.log(0);
        self
          .$axios({
            method: "post",
            url: "http://127.0.0.1:10520/register",
            data: {
              username: self.form.username,
              email: self.form.useremail,
              password: self.form.userpwd,
            },
          })
          .then((res) => {
            switch (res.data) {
              case 0:
                alert("注册成功！");
                this.login();
                this.$router.push("/admin");
                break;
              case -1:
                this.existed = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (self.checkMail(self.form.useremail) == false) {
        /**
         * @Created by Mol on 2022/01/04
         * @description 邮箱格式错误执行
         */
        console.log(self.checkMail(`${self.form.useremail}`));
        console.log(self.form.useremail);
        this.openVn("请输入正确的邮箱地址");
      } else {
        /**
         * @Created by Mol on 2022/01/04
         * @description 无输入且邮箱输入错误
         */

        this.openVn("所有内容");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url("../../public/img/background.png");
}
.contain {
  width: 45%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: auto;
  height: 60%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
