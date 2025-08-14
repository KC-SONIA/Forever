import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Productitem from './Productitem';
import Title from './Title';
const LatestCollections = () => {
    const { product }=useContext(ShopContext);
    const [latestProducts,setlatestProducts] = useState([]);
    // useEffect(()=>{
    //     setlatestProducts(product.slice(0,10));
    // },[])
    useEffect(() => {
    if (product && Array.isArray(product)) {
        setlatestProducts(product.slice(0, 10));
    }
}, [product]);

return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST '} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            welcome to FYORA
            </p>
        </div>
        {/* Rendering Products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <Productitem key={index} _id={item._id} images={item.images} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
)
}

export default LatestCollections
