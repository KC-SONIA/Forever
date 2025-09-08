import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel";
//placing order using cod method
const placeOrder = async(req,res) =>{
    try {
        const {userId , items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//placing orders using stripe method
const placeOrderStripe = async (req,res) =>{

}
//placing orders using razorPay Method 
const placeOrderRazorpay = async (res,req) =>{

}

// all order for admin panel
const allOrders = async (req,res) =>{

}
// user order data for frontend
const userOrders = async (req,res) =>{

}
// update order status from Admin panel 
const updateStatus = async (req,res) =>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}