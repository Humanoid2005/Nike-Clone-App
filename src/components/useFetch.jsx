import React from "react";

const useFetch = (url)=>{
    const [data,setdata] = React.useState(null);

    React.useEffect(()=>{
        const abortcontrol = new AbortController();

        setTimeout(()=>{
            fetch(url,{signal:abortcontrol.signal})
                .then(res=>{
                    if(!res.ok){
                        throw Error('could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then(data=>{
                    setdata(data);
                })
                .catch(err=>{
                    if(err.name=="AbortError"){
                        console.log("fetch aborted");
                    }
                    else{
                        console.log(err.message);
                    }
                })
        },1000);

        return ()=> abortcontrol.abort();
    },[url])

    return {data};
}

export default useFetch;