const db=require("../models");
const ROLES=db.ROLES;
const User=db.user;

checkDuplicateUsernameOrEmail=(req,res,next)=>{
    //username
    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message:"failed! username already exists"});
            return;
        }
       //email

       User.findOne({
        email:req.body.email
       }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message:"failed! email already exists"});
            return;
        }
       })
    })
};

checkRolesExisted=(req,res,next)=>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:`Failed!Role${req.body.roles[i]} doesn't exist!`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp={
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}
module.exports=verifySignUp;
