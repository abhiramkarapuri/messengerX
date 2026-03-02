import express from 'express';

const router = express.Router();

router.get("/send",(req,res)=>{
  res.send("Send message endpoint");
})

router.get("/get",(req,res)=>{
  res.send("get message endpoint");
})

export default router