import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//placing order using cod method
const placeOrder = async(req,res) =>{
    try {
        const {userId , items , amount , address} = req.body;
        console.log(userId+items+amount+address)
        console.log("in backend")
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
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    
    }
}
// user order data for frontend
const userOrders = async (req,res) =>{
    try {
       const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
       console.log(error)
        res.json({success:false,message:error.message}) 
    }
}
// update order status from Admin panel 
const updateStatus = async (req,res) =>{
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{ status })
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}