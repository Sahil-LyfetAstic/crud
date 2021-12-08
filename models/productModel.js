import  Mongoose  from "mongoose";

const productSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name"],
    trim: true,
    maxLength: [100, "Product name cannot be more than 100"],
    unique:true

  },
  price: {
    type: Number,
    required: [true, "Please add product name"],
    maxLength: [5, "Product name cannot be more than 100"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please add product description"],
  },
});

export default Mongoose.model("product",productSchema)
