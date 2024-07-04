import React from "react";
import { useDispatch } from "react-redux";
import {Link,useNavigate} from "react-router-dom";
import {login, register} from "../features/userSlice"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function SignUpPage(props){
    const [name,setname] = React.useState("");
    const [email,setemail] = React.useState("");
    const [password,setpassword] = React.useState("");
    const user = useSelector(selectUser);

    const dispatch =  useDispatch();
    const history = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        dispatch(register({
            username:name,
            email:email,
            password:password,
        })).then(action=>{
            if(action.type=="user/register/fulfilled"){
                localStorage.setItem("accessToken",action.payload.token);
                history("/products");
            }
            else if(action.type=="user/register/rejected"){
                alert("Username or Email-ID has already been taken");
            }
        });
        setname("");
        setemail("");
        setpassword("");
    }

    return (<div className="login-form">
        <div className="login-heading">
            <img src="./nike-logo-white.png" height={50}/>
        <h1 className="login-label">Join Us</h1>
        </div>
        <form className="login-input-form" onSubmit={handleSubmit} action="/products" method="POST">
            <div className="input-email">
                <h2>Name</h2>
                <input type="text" name="username" value ={name} onChange={(event)=>{setname(event.target.value)}} required/>
            </div>
            <div className="input-email">
                <h2>E-mail</h2>
                <input type="text" name="e-mail" value ={email} onChange={(event)=>{setemail(event.target.value)}} required/>
            </div>
            <div className="input-password">
                <h2>Password</h2>
                <input type="password" name="password" value ={password} onChange={(event)=>{setpassword(event.target.value)}} required/>
            </div>
            <button type="submit" className="login-button">Create Account</button>
        </form>
    </div>)
}

export default SignUpPage;