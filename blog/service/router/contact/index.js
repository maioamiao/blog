// 注册路由的业务逻辑处理
const express = require("express");
const router = express.Router();
const contactDB = require("../../database/contact");

//监听提交反馈数据的路由
router.post("/", async (req,res)=>{
    let {name, email, message} = req.body;
    if(name && email && message){
        //存到数据库中
        await contactDB.create({name, email, message});
        res.send({code: 0, message:"反馈成功"});
    }else{
        res.send({code: 1, message:"反馈的数据不规范"});
    }
});

module.exports = router;