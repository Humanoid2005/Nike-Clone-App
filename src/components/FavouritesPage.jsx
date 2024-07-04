import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import ProductCard from "./ProductCard";
import UserInfo from "./UserInfo";


function FavouritesPage(){
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
            <h1 className="favourites-heading">Favourites</h1>
            <div className="product-grid">
                {user.favourite.map((item,index)=>{return <ProductCard key={index} id = {'t'+index+'o'} name={item.productName} description={item.description} cost={item.listPrice} url={item.url} imgsrc={item.imageUrl} needdeletefavourite={true}/>})}
            </div>
        </div>
        
    )
}

export default FavouritesPage;