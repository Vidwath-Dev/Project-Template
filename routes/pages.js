const express=require('express');

const router =express.Router();

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/latest',(req,res)=>{
    res.render('latest');
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/contact',(req,res)=>{
    res.render('contact');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

module.exports=router;