const jwt = require('jsonwebtoken')
exports.generateToken = (req,res,next) => {
    console.log('req',req.loggedInUser);
    
    const options = {
        id : req.user.id,
        role:req.user.role
    }

    const token = jwt.sign(options,process.env.SECRET_KEY,{expiresIn:'30m'});

    if(!token){
        res.status(401).json({
            success:false,
            message:'login failed'
        });
    }

    const User = {
        id:req.user.id,
        fullname:req.user.fullname,
        email:req.user.email,
        role:req.user.role
    }
     res.status(201).cookie('token',token).json({
        success:true,
        message:'login completed',
        User
    });
}