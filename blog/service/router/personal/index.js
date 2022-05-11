const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");
const multer = require("multer");
const path = require("path");

//鉴权：判断用户是否在线（登录）
router.use((req, res, next) => {
    if(!req.session.userInfo){
        return res.send({
            code: 7, 
            message:"未登录，不能修改个人信息"
        })
    }
    next();
});

// /personal/user  修改用户名
router.post("/user", async (req, res)=>{
    let {user} = req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)){
        // 判断新名字与数据库里的名字是否一致
        if(user === req.session.userInfo.user){
            return res.send({
                code: 2, 
                message:"新用户名与原用户名是相同的，不可以修改"
            })
        }

        //验证该用户名是否被占用
        let userDoc = await userDB.findOne({user});
        if(userDoc){
            return res.send({
                code: 3, 
                message:"该用户名已经被别人用了，请更换一个"
            })
        }

        //修改数据库中该数据的用户名
        await userDB.findByIdAndUpdate(req.session.userInfo._id, {user});
        
        //更新session里存储的用户的名字
        req.session.userInfo.user = user;
        res.send({
            code: 0, 
            message:"修改成功",
            data:req.session.userInfo   //提供最新的用户信息给前端
        })

    }else{
        res.send({
            code: 1, 
            message:"你发过来的数据格式不规范"
        })
    }
});

//修改密码
router.post("/pass", async (req, res)=>{
    let {oldPassword,newPassword} = req.body;
    if(/^[a-zA-Z]\w{5,17}$/.test(newPassword)){

        //传过来的新密码和旧密码是否一致
        if(oldPassword === newPassword){
            return res.send({
                code: 6, 
                message:"新旧密码不能相同"
            });
        }

        //判断旧密码 是否 和数据库里的密码一致
        let doc = await userDB.findById(req.session.userInfo._id);
        if(doc.password !== oldPassword){ //不一致
            return res.send({
                code: 5, 
                message:"旧密码不正确"
            });
        }

        //到数据库中修改密码内容
        await userDB.findByIdAndUpdate(req.session.userInfo._id, {password:newPassword});
        req.session.destroy(); //销毁当前的session，因为修改密码后必须重新登录
        res.send({
            code: 0, 
            message:"密码修改成功，请重新登录"
        })
    }else{
        res.send({
            code: 4, 
            message:"你发过来的数据格式不规范"
        })
    }
});

//修改头像
router.post("/photo", async (req, res)=>{
    let name = null;
    // 配置multer中间件处理表单上传的图片文件
    let upload = multer({
        storage:multer.diskStorage({ //配置项
            // 设置文件存储在服务端的哪个目录
            destination(req, file, callback){
                callback(null, path.join(__dirname, "../../public/images/photo") );
            },
            // 设置文件的名字（防重名）
            filename(req, file, callback){
                // 名称.后缀名   file.originalname
                let {ext} = path.parse( file.originalname);
                name = req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name);
            }
        })
    }).single("file"); //处理name名为file的控件上传的图片文件   name值要匹配

    upload(req, res, async (err)=>{
        if(err){
            res.send({
                code:4,
                message:"头像上传失败"
            })
        }else{ //文件已经存储到服务端的指定目录了
            let photo = `/images/photo/${name}`;
            //改数据库里图片的路径
            await userDB.findByIdAndUpdate(req.session.userInfo._id, {photo});

            //改session里图片的路径
            req.session.userInfo.photo = photo;

            //响应前端
            res.send({
                code:0,
                message:"头像修改成功",
                data: req.session.userInfo
            })
        }
    });
})


module.exports = router;