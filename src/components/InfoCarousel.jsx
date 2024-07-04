import React from "react";

function InfoCarousel(props){
    const [info,setinfo] = React.useState("");
    const [infoid,setinfoid] = React.useState(0);
    
    React.useEffect(()=>{
        const IntervalID = setInterval(()=>{setinfoid((infoid+1)%props.InfoArray.length);setinfo(props.InfoArray[infoid]);},10000);
        return ()=> clearInterval(IntervalID);
    },[info]);

    return <div className="InfoCarousel">
        <h3>{info}</h3>
    </div>
}

export default InfoCarousel;