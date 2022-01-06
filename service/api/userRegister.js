/**
 * @Created by Mol on 2021/12/26
 * @description 用户注册校验
 */
const models = require('../db/db');
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

const userRegister = (req, res) => {
  const params = req.body;
  const sel_sql = $sql.user.select + " where userName = '" + params.userName + "'";
  const add_sql = $sql.user.add;
  console.log(sel_sql);

  conn.query(sel_sql, params.userName, (error, results) => {
    if (error) {
      console.log(err);
    }
    if (results.length != 0 && params.userName == results[0].userName) {
      res.send("-1"); // -1 表示用户名已经存在
    } else if (results.length != 0 && params.userEmail == results[0].userEmail) {
      res.send("-2") //表示邮箱存在
    } else {
      conn.query(add_sql, [params.userName, params.email, params.password], (err, rst) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rst);
          res.send("0"); // 0 表示用户创建成功
        }
      });
    }
  });
}

module.exports = {
  userRegister: userRegister
};
