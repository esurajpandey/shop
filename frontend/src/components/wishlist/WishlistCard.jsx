import styled from '@emotion/styled'
import React from 'react'
import {AiOutlineShoppingCart,AiFillDelete} from 'react-icons/ai';
const WishlistCard = ({product}) => {
  return (
    <WishlistCardConatiner>
        <div className='product-details'>
           <div className="first-grid">
                <div className="wish-img">
                    <img src={product?.product?.pictures[0]} alt={product.name} />
                </div>
           </div>
           <div className="second-grid">
                <h5>{product.product.name}</h5>
                <div className="h5"><span>Brand : </span> { product?.product?.brand?.name}</div>
           </div>
            <div className="added-at">
                <p></p>
            </div>
            
        </div>
    </WishlistCardConatiner>
  )
}

const WishlistCardConatiner = styled.div`
    display: flex;


    .product-details{
        display: flex;
        align-items :center;
        justify-content: center;
        border: 1px solid red;
        gap : 1em;
    }
    .first-grid{
        display: flex;
        flex-direction: column;
        align-items: center;
        .wish-img{
            display: flex;
            width: 4em;
            height: 4em;
            img{
                width: 4em;
                height: 4em;
            }
        }
    }

`

export default WishlistCard