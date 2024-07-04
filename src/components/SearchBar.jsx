import React from "react";
import {Link} from "react-router-dom";

function SearchBar(props){
    const[filter,setfilter] = React.useState("");

    function SearchClick(){
        props.getSearchContent(filter);
        setfilter("");
    }

    return <div className="searchbar">
            <input  className="filterinput" type="text" placeholder="Search product" onChange={(event)=>{setfilter(event.target.value)}} value={filter}></input>
            <button type= "submit" className="filterinputbutton" onClick={SearchClick} ><img src="./search.png" height={30}/></button>
      </div>;
}

export default SearchBar;