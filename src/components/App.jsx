import React, { useState } from "react";
import Modal from "./Modal";
import NavBar from "./NavBar";
import InfoCarousel from "./InfoCarousel";
import SortingForm from "./SortingForm";
import NikeData from "./data";
import ProductCard from "./ProductCard";
import ImageCarousel from "./ImageCarousel";
import FavouritesPage from "./FavouritesPage";
import CartPage from "./CartPage";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Lottie from "lottie-react";
import AnimationData from "./Animation - 1719941423835.json";
import { TypeAnimation } from 'react-type-animation';
import useFetch from "./useFetch";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/userSlice";

function ProductPage() {
    //I have directly taken data from the .json file but in case we want to fetch it from a fake REST API then follow the below two lines of code instead of 'import NikeData from "./data.jsx' "
    //run npx json-server --watch data/db.json --port 8000
    // const {data:NikeData} = useFetch("http://localhost:8000/products");

    document.querySelector("body").style.backgroundColor = "white";
    const [filteron,setfilteron] = useState([]);
    const [heading,setheading] = useState("All Products");
    const [nproducts,setnproducts] = useState(NikeData.length);
    const [sortOrder,setsortOrder] = useState(true);
    const [filter,setfilter] = useState("");
    const InfoArray = [<a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">Get 80% Off on our Products</a>,<a href="https://www.nike.com/w/shop-your-store-8b4bh" target="_blank">Look for store on checkout</a>,<a href="https://www.adidas.co.in/outlet?cm_mmc=AdieSEM_Google-_-adidas-Brand-B-Exact-RLSA-_-Search-_--_-dv%3AeCom-_-cn%3Aadidas-Brand-B-Exact-RLSA-_-pc%3AGoogle&cm_mmc1=IN&cm_mmc2=PPC-Multiple--Multiple-Multiple-IN-EMEA-eCom-Paid_Search&gad_source=1&gclid=CjwKCAjwyo60BhBiEiwAHmVLJX-_HNKN5dHc4iC3jmXYTUqn-mpsVKsJLYZpnolseU7X8kK424PWgxoC52sQAvD_BwE" target="_blank">We are better than our competitors</a>,<a href="https://humanoid2005.github.io/Weather-WebApp/" target="_blank">Let's checkout the weather</a>];
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getCurrentUser());
    },[dispatch])

    function checkfilters(filtervalues){
        setfilteron(filtervalues.parameters);
        setheading(filtervalues.heading);
        setnproducts(filtervalues.parameters.length==0?NikeData.length:NikeData.filter((item)=>{
            return isPresent(filtervalues.parameters[0],item)||(filtervalues.parameters.length==2?isPresent(filtervalues.parameters[1],item):false)||(filtervalues.parameters[0]=='Accessories' && item.category=='Accessories' && (item.url.includes('-sock-')==false));
        }).length);
    }

    function isPresent(word,item){
        return item.url.includes(word);
    }

    function whatSort(bool){
        setsortOrder(bool);
    }

    function getSearchContent(criteria){
        setfilter(criteria);
    }


    return (
        <div className="product-page">
            <NavBar getSearchContent = {getSearchContent}/>
            <InfoCarousel InfoArray = {InfoArray}/>
            <div className="second-navbar">
                <h1>{`${heading} (${nproducts})`}</h1>
                <div className="filter-modal">
                    <Modal checkfilters={checkfilters}/>
                    <SortingForm getSort={whatSort}/>
                </div>
            </div>
            <div className="product-grid">
                {filteron.length==0?NikeData.sort((a,b)=>{return sortOrder?a.listPrice-b.listPrice:b.listPrice-a.listPrice;}).filter((item)=>{return filter.toLowerCase()==""?item:item.productName.toLowerCase().includes(filter.toLowerCase())}).map((item,index)=>{return <ProductCard key={index} id = {'t'+index+'o'} name={item.productName} description={item.description} cost={item.listPrice} url={item.url} imgsrc={item.imageUrl} needfavourite={true} needcart={true}/>;}):(NikeData.sort((a,b)=>{return sortOrder?a.listPrice-b.listPrice:b.listPrice-a.listPrice;}).filter((item)=>{return filter.toLowerCase()==""?item:item.productName.toLowerCase().includes(filter.toLowerCase())}).filter((item)=>{
                    return isPresent(filteron[0],item)||(filteron.length==2?isPresent(filteron[1],item):false)||(filteron[0]=='Accessories' && item.category=='Accessories' && (item.url.includes('-sock-')==false));
                }).map((item,index)=>{return <ProductCard key={index} id = {'t'+index+'o'} name={item.productName} description={item.description} cost={item.listPrice} url={item.url} imgsrc={item.imageUrl} needfavourite={true} needcart={true}/>;}))}
            </div>
        </div>);
}


function HomePage(){
    const Nikeprop = React.useRef();
    document.querySelector("body").style.backgroundColor = "black";
    const imageUrlArray = ["https://static.nike.com/a/images/t_default/45942257-f8b8-420a-885e-a0740a9ad0da/cortez-vintage-suede-shoes-nQSpJ7.png",
                            "https://static.nike.com/a/images/t_default/80f8b6ea-cedb-46c6-bbe4-ddd55379c255/little-kids-metallic-pants-bDDss9.png",
                            "https://static.nike.com/a/images/t_default/d0a2dc4c-d277-4d30-984b-bef060f49a98/dri-fit-academy-big-kids-soccer-track-pants-8m0t5m.png",
                            "https://static.nike.com/a/images/t_default/512b1470-6a75-4db8-a75f-64de793122f5/ispa-vest-2-7tBFpS.png",
                            "https://static.nike.com/a/images/t_default/b1d3f3b6-4e40-4c68-aa40-8b3994fa3687/michigan-state-mensreplica-baseball-jersey-HPS4Qd.png",
                            "https://static.nike.com/a/images/t_default/6f27d6bc-525b-4ead-9fb9-b234c099b20b/paris-saint-germain-strike-fourth-mens-jordan-dri-fit-soccer-woven-tracksuit-zKh3gf.png",
                            "https://static.nike.com/a/images/t_default/ungwwpf1xp764wi3g9wg/everyday-plus-cushioned-training-ankle-socks-6-pairs-xql9Hn.png"
                        ]

    return (
        <div className="homepage">
            <div className="NikeNameAnimation">
                <Link to="/"><Lottie 
                    className="Nike-Animation"
                    lottieRef={Nikeprop}
                    loop={false}
                    animationData={AnimationData}
                /></Link>
                <TypeAnimation
                    sequence={["N",500,"Ni",500,"Nik",500,"Nike",()=>{console.log("Done typing nike.")}]}
                    cursor={false}
                    repeat={0}
                    className="nike-typing-animation"
                />
            </div>
            <div className="vision">
                <TypeAnimation
                    sequence={[1500,"To ",50,"To remain ",50,"To remain the ",50,"To remain the most ",50,"To remain the most authentic, ",50,"To remain the most authentic, connected, ",50,"To remain the most authentic, connected, and ",50,"To remain the most authentic, connected, and distinctive ",50,"To remain the most authentic, connected, and distinctive brand",()=>{console.log("Done typing nike.")}]}
                    cursor={false}
                    repeat={0}
                    className="nike-vision-animation"
                />
            </div>
            <ImageCarousel imageUrlArray={imageUrlArray}/>
            <div className="login-signup-flexbox">
                <Link to="/login" className="Login-Link">Login</Link>
                <Link to="/sign-up" className="SignUp-Link">Sign Up</Link>
            </div>
        </div>
    )
}

function LoginPage(){
    document.querySelector("body").style.backgroundColor = "black";

    return (<div className="login-page">
                <div className="NikeNameAnimation">
                    <Link to="/"><Lottie 
                        className="Nike-Animation"
                        loop={false}
                        animationData={AnimationData}
                    /></Link>
                    <TypeAnimation
                        sequence={["N",500,"Ni",500,"Nik",500,"Nike",()=>{console.log("Done typing nike.")}]}
                        cursor={false}
                        repeat={0}
                        className="nike-typing-animation"
                    />
                </div>
                <LoginForm/>
            </div>)
}

function SignUpPage(){
    document.querySelector("body").style.backgroundColor = "black";

    return (<div className="login-page">
        <div className="NikeNameAnimation">
            <Link to="/"><Lottie 
                className="Nike-Animation"
                loop={false}
                animationData={AnimationData}
            /></Link>
            <TypeAnimation
                sequence={["N",500,"Ni",500,"Nik",500,"Nike",()=>{console.log("Done typing nike.")}]}
                cursor={false}
                repeat={0}
                className="nike-typing-animation"
            />
        </div>
        <SignUpForm/>
    </div>)

}

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/favourites" element={<FavouritesPage/>}/>
                <Route path="/cart" element={<CartPage/>}></Route>
            </Routes>
        </Router>
    )
}

export default App;
