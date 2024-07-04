import React from "react";

function SortingForm(props){
    const [sort,setsort] = React.useState(false);

    function SortOption(event){
        const val = event.target.value;
        if(val=="ascending"){
            setsort(true);
        }
        else if(val=="descending"){
            setsort(false);
        }
        props.getSort(sort);
    }

    return <div className="sorting-form">
        <form>
            <select className="selection-form" onChange={SortOption}>
                <option value="placeholder">Sort By</option>
                <option value="descending">Price:Low to High</option>
                <option value="ascending">Price: High to Low</option>
            </select> 
        </form>
    </div>
}

export default SortingForm;