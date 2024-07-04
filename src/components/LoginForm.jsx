import React from "react";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function LoginPage(props){
    const [email,setemail] = React.useState("");
    const [password,setpassword] = React.useState("");
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = useSelector(selectUser);

    function SubmitLogin(event){
        event.preventDefault();
        dispatch(login({
            email:email,
            password:password
        })).then(action=>{
            if(action.type=="user/login/fulfilled"){
                localStorage.setItem("accessToken",action.payload.token);
                history("/products");
            }
            else if(action.type=="user/login/rejected"){
                alert("Wrong Email-ID or Password");
            }
        });
        setemail("");
        setpassword("");
    }

    return (<div className="login-form">
        <div className="login-heading">
            <img src="./nike-logo-white.png" height={50}/>
        <h1 className="login-label">Log In</h1>
        </div>
        <form className="login-input-form" onSubmit={SubmitLogin}>
            <div className="input-email">
                <h2>E-mail</h2>
                <input type="text" name="e-mail" value ={email} onChange={(event)=>{setemail(event.target.value)}} />
            </div>
            <div className="input-password">
                <h2>Password</h2>
                <input type="password" name="password" value ={password} onChange={(event)=>{setpassword(event.target.value)}} />
            </div>

            <Link className="redirect-to-sign-up" to="/sign-up">New Here ? Create an account</Link>
            <button type="submit" className="login-button">Log In</button>
        </form>
    </div>)
}

export default LoginPage;