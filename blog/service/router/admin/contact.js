const express = require("express");
const router = express.Router();
const contactDB = require("../../database/contact");

//请求获取所有的反馈数据
router.get("/", async(req, res)=>{
    let doc = await contactDB.find();
    if(doc.length === 0){
        res.send({code:6, message:"没有反馈数据"});
    }else{
        res.send({code:0, message:"获取反馈数据成功", data:doc});
    }
});
//修改反馈里的 reading状态值
router.post("/update", async (req,res)=>{
    let {id, reading} = req.body;
    //数据校验id是否存在
    await contactDB.findByIdAndUpdate(id, {reading});
    res.send({code:0, message:"成功修改状态"});
});

module.exports = router;