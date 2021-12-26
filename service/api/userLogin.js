/**
 * @Created by Mol on 2021/12/26
 * @description 用户登录校验
 */
const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

const userLogin = (req, res) => {
  console.log(res.body)
  const user = req.body;
  const sel_email = $sql.user.select + " where email = '" + user.email + "'";
  console.log(sel_email);
  conn.query(sel_email, user.email, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results)
    if (results[0] === undefined) {
      res.send("-1"); // -1 表示查询不到，用户不存在，即邮箱填写错误
    } else {
      if (results[0].email == user.email && results[0].password == user.password) {
        res.send("0"); // 0 表示用户存在并且邮箱密码正确
      } else {
        res.send("1"); // 1 表示用户存在，但密码不正确
      }
    }
  })
}
module.exports = {
  userLogin: userLogin
}
