import React from "react";
import {addfavourite,removefavourite,addcart,removecart} from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate} from "react-router-dom";

function ProductCard(props){
    const history = useNavigate();
    const dispatch  = useDispatch();
    const [liked,setliked] = React.useState(false);
    const [carted,setcarted] = React.useState(false);
    const user = useSelector(selectUser);
    const item = {url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description};

    React.useEffect(()=>{
        if(user.favourite.findIndex((card)=>(card.url==item.url))>-1){
            setliked(true);
            if(document.querySelector(`#${props.id} img.favourite-image`)!=null){
                document.querySelector(`#${props.id} img.favourite-image`).src = "./favourite-on.png";
            }
        }
        if(user.cart.findIndex((card)=>(card.url==item.url))>-1){
            setcarted(true);
            if(document.querySelector(`#${props.id} img.cart-image`)!=null){
                document.querySelector(`#${props.id} img.cart-image`).src = "./cart-on.png";
            }
        }
    },[]);

    function AddToFavourites(event){
        if(liked == false){
            setliked(true);
            if(event.target.className=="favourite-image"){
                event.target.src = "./favourite-on.png";
            }
            else if(event.target.className=="favourite-button"){
                event.target.children[0].src = "./favourite-on.png";
            }
            dispatch(addfavourite({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}))
        }
        else{
            setliked(false);
            if(event.target.className=="favourite-image"){
                event.target.src = "./favourite-off.png";
            }
            else if(event.target.className=="favourite-button"){
                event.target.children[0].src = "./favourite-off.png";
            }
            dispatch(removefavourite({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}));
        }
    }

    function AddToCart(event){
        if(carted == false){
            setcarted(true);
            if(event.target.className=="cart-image"){
                event.target.src = "./cart-on.png";
            }
            else if(event.target.className=="cart-button"){
                event.target.children[0].src = "./cart-on.png";
            }
            dispatch(addcart({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}))
        }
        else{
            setcarted(false);
            if(event.target.className=="cart-image"){
                event.target.src = "./cart-off.png";
            }
            else if(event.target.className=="cart-button"){
                event.target.children[0].src = "./cart-off.png";
            }
            dispatch(removecart({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}));
        }
    }

    function deletefavourite(){
        dispatch(removefavourite({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}));
        history("/favourites");
    }

    function deletecart(){
        dispatch(removecart({url:props.url,imageUrl:props.imgsrc,productName:props.name,listPrice:props.cost,description:props.description}));
        history("/cart");
    }

    return  <div className="product product-card" id = {props.id}>
            <a href={props.url}><img className="product product-image" src = {props.imgsrc}/></a>
            <div className="product product-information">
                <h3 className="product product-name">{props.name}</h3>
                <p className="product product-description">{props.description}</p>
                <div className="cost-favourite">
                    <h3 className="product product-cost">${props.cost}</h3>
                    {props.needfavourite&&<button className="favourite-button" onClick={AddToFavourites}><img className="favourite-image" src="./favourite-off.png" height={30}/></button>}
                    {props.needcart&&<button className="cart-button" onClick={AddToCart}><img className="cart-image" src="./cart-off.png" height={30}/></button>}
                    {props.needdeletefavourite&&<button className="delete-button" id = {"s"+props.id} onClick={deletefavourite}><img className="delete-image" src="./delete.png" height={30}/></button>}
                    {props.needdeletecart&&<button className="delete-button" id = {"s"+props.id} onClick={deletecart}><img className="delete-image" src="./delete.png" height={30}/></button>}
                </div>
            </div>
        </div>
}

export default ProductCard;