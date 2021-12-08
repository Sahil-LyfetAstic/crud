import  mongoose  from "mongoose";
import validator from 'validator'
import  Jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxlength:[30,'Maximum length 30']
    },
    email:{
        type:String,
        required:[true,'please enter your Email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email']

    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[4,"password must have 4 character"],
        select:false
    }
})


//encrypt password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('passoword')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//Return JWt Token
userSchema.methods.getJwtToken = function(){

   return Jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: 60*60*24
    })
}


//compare user password
userSchema.methods.comparePassword = async (enteredPassword)=>{
    return await bcrypt.compare(enteredPassword,this.password)
}



export default mongoose.model("user",userSchema)