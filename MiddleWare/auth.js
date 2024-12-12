const jwt = require('jsonwebtoken');

exports.authentication = (req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        res.status(403).json({
            success:false,
            message:'unAuthorized access, please login'
        });
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            res.status(404).json({
                success:false,
                message:'please login'
            })
        }
        
        req.userId = decode.id;
        req.role = decode.role
        next();
    })
}

exports.authorization = (...roles)=>{
    
    return (req,res,next)=>{
        const role = req.role
        
        if(!roles.includes(role)){
            res.status(403).json({
                success:false,
                message:'un authorized access'
            })
        }
        next();
    }
}