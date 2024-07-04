import React from "react";

function ImageCarousel(props){
    const Arraylength = props.imageUrlArray.length;
    const [imageurlid,setimageurlid] = React.useState(0);

    function GoNext(){
        setimageurlid((imageurlid+1)%Arraylength);
        console.log(imageurlid);
    }

    function GoBack(){
        imageurlid!=0?setimageurlid((imageurlid-1)%Arraylength):setimageurlid(Arraylength-1);
        console.log(imageurlid);
    }

    return <div className="image-carousel">
        <button className="carousel-button" onClick={GoBack} ><img src="./arrow-left-circle.png"/></button>
        <img className="carousel-image" src = {props.imageUrlArray[imageurlid]}/>
        <button className="carousel-button" onClick={GoNext} ><img src="./arrow-right-circle.png"/></button>
    </div>
}

export default ImageCarousel;