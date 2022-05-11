const express = require("express");
const router = express.Router();
// console.log(router);
// router.post("/reg",(req,res)=>{
//     res.send("注册的数据收到了"); 
// });
// 归总所有需要监听的路由

//监听注册路由
router.use("/reg", require("./register/reg.js"));

//监听登录路由
router.use("/login", require("./login/login.js")); 

//监听修改用户信息的路由
router.use("/personal", require("./personal/index.js")); 
// /personal/user
// /personal/pass
// /personal/photo

//监听提交评论/回复数据的路由
router.use("/msg", require("./msg/index.js")); 
// /msg/publish

//监听获取评论/文章数据的路由
router.use("/getdata", require("./getData/index.js")); 

//监听后台管理的操作路由
router.use("/administer", require("./admin/index.js")); 

// 监听提交反馈
router.use("/contact", require("./contact/index.js")); 


module.exports = router;