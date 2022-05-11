// 注册路由的业务逻辑处理
const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象
const visitorDB = require("../../database/visitor");//userinfo表的操作对象

//添加访客
async function addVisitor(userID){
    //通过id查找访客数据
    let doc = await visitorDB.findOne({visitor:userID});
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
        await visitorDB.findOneAndUpdate({visitor:userID}, {data:Date.now()});
    }else{
        //如果表中不存在该访客数据，添加访客到表中
        await visitorDB.create({visitor:userID});
    }
}

router.post("/", async (req, res)=>{
    let {user, password} = req.body;
    // 校验
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)){
        //验证用户名和密码是否正确
        let userDoc = await userDB.findOne({user});
        // null
        //用户不存在
        if(!userDoc){
            res.send({
                code: 2,
                message:"用户不存在，请先注册"
            });
            return 
        }

        if(userDoc.password === password){
            let userInfo = {
                user: userDoc.user,
                _id: userDoc._id,
                photo: userDoc.photo,
                admin: userDoc.admin,
            }
            //1将用户的信息数据存到session中
            req.session.userInfo = userInfo;

            //添加访客
            addVisitor(userInfo._id); //传入当前的访客用户id

            //密码正确  登录成功
            res.send({
                code: 0,
                message:"登录成功",
                data:userInfo //给前端用户数据
            });

        }else{
            //密码错误
            res.send({
                code: 3,
                message:"密码错误"
            });
            return 
        }

    }else{
        res.send({
            code: 1, //你发过来的数据格式不规范
            message:"你发过来的数据格式不规范"
        })
    }
});

//检测是否登录
router.post("/isCheck", (req, res)=>{
//    console.log("----isCheck----", req.session);
   let data = req.session.userInfo; 
//    console.log(data);
   if(data){
       //更新访客的访问时间
       addVisitor(req.session.userInfo._id); //传入当前的访客用户id
       //已登录
        res.send({
            code:0,
            msg: "已经登录",
            data
        });
   }else{
       //未登录
        res.send({
            code:1,
            msg:"未登录",
            data:{}
        })
   }
});

//退出登录
router.post("/out", (req, res)=>{
    req.session.destroy(); //销毁当前的session
    res.send({
        code:0,
        message:"已退出，请重新登录一下"
    })
});


module.exports = router;