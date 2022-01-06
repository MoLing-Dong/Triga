var sqlMap = {
  user: {
    add: 'insert into user (userName, email, password) values (?,?,?)',
    select: 'select * from `user`'
  }
}

module.exports = sqlMap;
