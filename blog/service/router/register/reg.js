// 注册路由的业务逻辑处理
const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象

router.post("/", async (req, res)=>{
    let {user, password} = req.body;
    // res.send("111111")
    // 校验
    //字符验证
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)){
        //数据格式ok，要将数据存到数据库中
        //查询用户是否已经存在
        let userDoc = await userDB.findOne({user});
        if(userDoc){
            //有存在相同用户数据
            res.send({
                code: 2, //用户已存在
                message:"用户已存在"
            })
        }else{
            //不存在相同用户数据
            await userDB.create({user, password});
            res.send({
                code: 0, //注册成功
                message:"注册成功"
            })
        }
    }else{
        res.send({
            code: 1, //你发过来的数据格式不规范
            message:"你发过来的数据格式不规范"
        })
    }
});

module.exports = router;