import React from "react";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import {Link,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {logout} from "../features/userSlice";
import { useDispatch } from "react-redux";

function NavBar(props){
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useNavigate();

    function handleLogout(event){
        event.preventDefault();
        dispatch(logout());
        history("/");
    }



    return <div className="navbar">
        <div className="side-nav">
            <Link to="/products"><img src="./nike-image.png" height={60}/></Link>
            <SearchBar getSearchContent = {props.getSearchContent}/>
        </div>
        <div className="favourites-cart-grid">
            <UserInfo/>
            <Link to="/favourites"><img src="./heart.png" height={50}/></Link>
            <Link to="/cart"><img src="./cart-off.png" height={50}/></Link>
            <form action="/">
                <button onClick={handleLogout} type="submit" className="logout-button" >Logout</button>
            </form>
        </div>   
    </div>
}

export default NavBar;