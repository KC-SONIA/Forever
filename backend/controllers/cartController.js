import userModel from '../models/userModel.js'
// add products to user cart
const addToCart = async (req,res) =>{
    try {
       const {userId,itemId,size} = req.body
       
       const userData = await userModel.findById(userId)
    
      let cartData = await userData.cartData 
 
                //     cartData: {
                //     "itemId1": {
                //     "M": 2,
                //     "L": 1
                //   },
                //   "itemId2": {
                //     "S": 3
                //   }
                // }
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true , message:"Added To Cart"})
       
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// update user cart
    const updateCart = async (req,res) =>{
        try {
        const {userId,itemId,size,quantity} = req.body
     
     
        const userData = await userModel.findById(userId)
      
        let cartData = await userData.cartData
        if (quantity > 0) {
            cartData[itemId][size] = quantity;
        }
         else {
            delete cartData[itemId][size];
        }

        // ✅ CLEANUP
        for (const items in cartData) {
            for (const s in cartData[items]) {
                if (cartData[items][s] === 0) {
                    delete cartData[items][s];
                }
            }
            if (Object.keys(cartData[items]).length === 0) {
            delete cartData[items];
        }
        }
        
        
        await userModel.findByIdAndUpdate(userId,{cartData})
         res.json({success:true , message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}
// get user cart data
const getUserCart = async (req,res) =>{
    try {
        const {userId } = req.body
        const userData = await userModel.findById(userId)
       
        const cartData = userData.cartData
        
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}