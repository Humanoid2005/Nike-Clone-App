import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import ProductCard from "./ProductCard";
import UserInfo from "./UserInfo";


function CartPage(){
    const history = useNavigate();
    const user = useSelector(selectUser);

    function backtoproducts(){
        history("/products");
    }

    return (
        <div className="product-page">
            <div className="navbar">
                <Link to="/products"><img src="./nike-image.png" height={60}/></Link>
                <div className="favourites-cart-grid">
                    <UserInfo/>
                    <form action="/products">
                        <button onClick={backtoproducts} type="submit" className="logout-button" >Back To Products</button>
                    </form>
                </div>
            </div>
            <h1 className="favourites-heading">Cart</h1>
            <div className="product-grid">
                {user.cart.map((item,index)=>{return <ProductCard key={index} id = {'t'+index+'o'} name={item.productName} description={item.description} cost={item.listPrice} url={item.url} imgsrc={item.imageUrl} needdeletecart={true}/>})}
            </div>
        </div>
        
    )
}

export default CartPage;