import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency='₹';
    const delivery_fee=10;
    const backendUrl =import.meta.env.VITE_BACKEND_URL
    const [totalAmount, setTotalAmount] = useState(0);
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [product,setProduct]=useState([]);
    const [token,setToken] = useState('');
    const navigate=useNavigate();


   const addToCart = async (itemId, size,token) => {
    if (!size) {
        toast.error('Select the Product Size');
        return;
    }
    if(!token){
        toast.error('Please sign in to continue!')
        navigate('/login')
        return;
    }
    let cartData = structuredClone(cartItems || {});  
    toast.success('Added to cart');
    navigate('/cart')
    if (!cartData[itemId]) {
        cartData[itemId] = {};
    }
    
    if (!cartData[itemId][size]) {
        cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += 1;

    setCartItems(cartData);
    
    
    if (token) {
        try {
            await axios.post(backendUrl + '/api/cart/add',{ itemId, size },{ headers: { token } });
           
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
};
    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                }
                catch(error){
                    console.log(error)
                toast.error(error.message)
                }
            }
        }
        return totalCount;
    }
    // const getCartAmount=()=>{
    //     let totalAmount=0;
    //     for(const items in cartItems){
    //         console.log(product)
    //        let itemInfo = product.find((product)=>product._id===items);
    //         for(const item in cartItems[items]){
    //             try{
    //                 if(cartItems[items][item]>0){
    //                     totalAmount+=itemInfo.price*cartItems[items][item];
    //                 }
    //             }
    //             catch(error){
    //                 console.log(error)
    //                 toast.error(error.message)

    //             }
    //         }
    //     }
    //     return totalAmount;
    // }
    useEffect(() => {
  const calculateTotal = () => {
    let total = 0;
    for (const items in cartItems) {
      const itemInfo = product.find(p => p._id === items);

      if (!itemInfo) continue; // skip if product not found yet

      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          total += itemInfo.price * cartItems[items][size];
        }
      }
    }
    setTotalAmount(total);
  };
  calculateTotal();
}, [cartItems, product]);

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);

        if (quantity > 0) {
        cartData[itemId][size] = quantity;
        } 
        else {
            delete cartData[itemId][size];
        }

        // ✅ CLEANUP: remove leftover 0s
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
        
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    const getUserCart = async (token) =>{
        try {
          
                const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
                if(response.data.success){
                    setCartItems(response.data.cartData);
                }
            
            
        } catch (error) {
            console.log(error)
        }
    }
    const getProductsData =async()=>{
        try{
            const response =  await axios.get(backendUrl +'/api/product/list')
            if(response.data.success){
              setProduct(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
      getProductsData()
    }, []);

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[token])
    const value={
        product,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,totalAmount,navigate,backendUrl,
        setToken,token
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;