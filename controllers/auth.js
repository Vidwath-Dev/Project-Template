const mysql = require('mysql2');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register=(req,res)=>{
    console.log(req.body);

//  variable   <-------  form data names
 /* const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;*/

    const { name, email, password, confirmPassword}=req.body;

 // queries to database
    connection.query('SELECT email FROM users WHERE email= ?',[email],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){       //if already an email in database
            return res.render('register',{
                message:'That email is already in use'
            })
        }else if(password !== confirmPassword){
            return res.render('register',{
                message:'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        //sql query to insert into database
        connection.query('INSERT INTO users SET ?',{name:name, email:email, password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register',{
                    message:'User registered'
                });
            }
        })

    });   
}
