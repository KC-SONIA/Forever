import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Productitem from './Productitem';
import Title from './Title';

const RelatedProducts = ({category,subCategory}) => {

    const {product}=useContext(ShopContext);
    const[related,setRelated]=useState([]);

    useEffect(()=>{
        if(product.length>0){
            let productCopy=product.slice();

            productCopy=productCopy.filter((item)=>category===item.category);
            productCopy=productCopy.filter((item)=>subCategory===item.subCategory);

            setRelated(productCopy.slice(0,5));
        }
    },[product])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED  "} text2={"PRODUCTS"}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ga-y-6p'>
        {related.map((item,index)=>(
            <Productitem key={index} id={item._id} name={item.name} price={item.price} images={item.images}/>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
