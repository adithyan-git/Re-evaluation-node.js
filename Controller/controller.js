const bcrypt = require('bcrypt'); 
const userSchema = require('../Models/registerdUsersSchema');
const {  generateToken } = require('../Utils/generatetoken');
const products = require('../Models/productSchema');
exports.registration = async (req,res,next)=>{

    const {fullname , email ,password} = req.body;
    

    if(!fullname || !email || !password){
        res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        
    const User = await userSchema.create({
        fullname,
        email,
        password:hashedPassword
    })
    
    res.status(201).json({
        success:true,
        message:'registration completed',
        User
    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
exports.userLogin = async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

   try {
    const findedUser = await userSchema.findOne({email});
    console.log('findedUser=',findedUser);
    
    if(!findedUser){
        res.status(404).json({
            success:false,
            message:'usernot found,invalid email'
        });
    };

    const passwordMatch = await bcrypt.compare(password,findedUser.password);


    if(!passwordMatch){
        res.status(404).json({
            success:false,
            message:'user not found , invalid password'
        });
    }

    const loggedInUser = {
        id:findedUser._id,
        fullname:findedUser.fullname,
        email:findedUser.email,
        role:findedUser.role
    }

    req.user = loggedInUser
    generateToken(req,res)

   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.displayProfile = async (req,res,next)=>{

    const userId = req.params.id 

    if(!userId){
       return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

    const findedUser = await userSchema.findById(userId);
    console.log('findedUser==',findedUser);
    
    if(!findedUser){
       return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const userProfile = {
        id:findedUser._id,
        fullname:findedUser.fullname,
        email:findedUser.email
    }

   return res.status(200).json({
        success:true,
        message:'user profile displayed',
        userProfile
    });
}
exports.updateProfile = async(req,res,next)=>{

    const userId = req.params.id;
    
    const {fullname,email} = req.body;
   
    
    if(!userId){
       return res.status(400).json({
            success:false,
            message:'no recipe id'
        });
    }
    if(!fullname || !email){
       return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }
   try {
    
    const findedUser = await userSchema.findById(userId);
    
    if(!findedUser){
       return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    findedUser.fullname = fullname;
    findedUser.email = email;
    findedUser.save();

    res.status(200).json({
        success:false,
        message:'userProfile updated',
        findedUser
    });
   } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
    });
   }




}
exports.deleteProfile = async(req,res,next)=>{

    const userId = req.params.id;

    if(!userId){
       return res.status(400).json({
            success:false,
            message:'no userid'
       });
    }

    const deletedUser = await userSchema.findByIdAndDelete(userId);

    if(!deletedUser){
        res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    res.status(200).json({
        success:true,
        message:'user profile deleted'
    });
}
exports.addProduct = async(req,res,next)=>{
    const {productname , description , price , quantity} = req.body;
    if(!productname || !description || !price || !quantity){
        res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }
    const product = await products.create({
        productname,
        description,
        price,
        quantity
    });

    res.status(201).json({
        success:true,
        message:'product added successfully',
        product
    });
}
exports.updateProduct = async(req,res,next)=>{
    const productId = req.params.id;
    const {productname,description,price,quantity} = req.body;

    if(!productId){
       return res.status(400).json({
            success:false,
            message:'no product id'
        });
    }

    if(!productname || !description || !price || !quantity){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {

    const findedProduct = await products.findById(productId);

    if(!findedProduct){
       return res.status(400).json({
            success:false,
            message:'product not found'
        });
    }

    findedProduct.productname = productname;
    findedProduct.description = description;
    findedProduct.price = price;
    findedProduct.quantity = quantity;

    findedProduct.save();
    
    return  res.status(200).json({
        success:false,
        message:'product updation completed'
    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.deleteProduct = async (req,res,next)=>{
    const productId = req.params.id;
    

    if(!productId){
       return res.status(400).json({
            success:false,
            message:'no recipeId'
        });
    }

   try {
    const deletedProduct = await products.findByIdAndDelete(productId);

    if(!deletedProduct){
       return res.status(404).json({
            success:false,
            message:'product not found'
        });
    }

    res.status(200).json({
        success:true,
        message:'product deleted'
    })
   } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
   }
}
exports.displayProducts = async(req,res,next)=>{
    const allProducts = await products.find();

    if(!allProducts){
       return res.status(404).json({
            success:false,
            message:'not products available'
        });
    }

   return res.status(200).json({
        success:true,
        message:'products displayed',
        allProducts
    });
}
exports.displayUsers = async (req,res,next)=>{
    const allUsers = await userSchema.find();

  const registerdUser = allUsers.filter((user)=>user.role !== "admin")

    if(!allUsers){
        res.status(404).json({
            success:false,
            message:'no users founded'
        });
    }

    res.status(200).json({
        success:true,
        message:'user displayed',
        registerdUser
    })
}