const User = require('../models/user')
const _ =require('lodash')
module.exports.register=(req,res)=>{
    //serialize input
    const body= _.pick(req.body,['username','email','password','mobile'])
    const user = new User(body)
    user.save()
    .then((user)=>{
        // const {_id,username,email}=user
        // res.json({_id,username,email})
        res.json(_.pick(user,['_id','email','password']))
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.login=(req,res)=>{
    const body=_.pick(req.body,['email','password'])
    User.findByCredentials(body.email,body.password)
    .then((user)=>{
       return user.generateToken()
    })
    .then((token)=>{
        res.json({token})
    })
    .catch((err)=>{
     res.json(err)
    })
    
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.account=(req,res)=>{
    const {user} =req
    res.json(_.pick(user,['_id','email','password']))
    // const {_id,username,email}=user
    //     res.json({_id,username,email})
}





module.exports.logout=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.send({notice:'Succesfully logged out'})
    })
    .catch((err)=>{ 
        res.send(err)
    })
}
