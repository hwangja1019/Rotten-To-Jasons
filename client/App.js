import React, {useState, useEffect} from "react";
import Drama from "./components/drama"
import Form from "./components/form"
import "./scss/application.scss";
// import myFace from "../imgs/myFace-nobckgrnd";
// const myFace = require('../imgs/myFace-nobckgrnd');

const App =  () =>{
 
    const [state, setData] = useState([])
    useEffect(() => {
        fetch('/entries')
        .then(res=>{
            console.log(res);
            return res.json()})
        .then(data => {
            const newData = data.map(obj => {
                return {...obj, edit: false, open: false}
            })
            console.log("this is the data: ", `${JSON.stringify(newData)}`)
            setData(newData)
        })
        .catch(err => console.log("Failed to get character: ", err));
    }, []);

    const change = (dataObj, str, remove = false) => { 
        const num = Number(str.slice(3));
        let newState = state.slice();
        //make sure data is an obj
        if (remove){
            newState = newState.slice(0, num).concat(newState.slice(num+1))
        } else {
            newState[num] = dataObj;
        }
        setData(newState); 
    }
    const add = (newObj) => {
        const newState = state.slice()
        newState.push(newObj);
        setData(newState);
    }
    const entries = []
    for (let i = 0; i < state.length; i++){
        entries.push(<Drama change={change} {...state[i]} num={'num'+i} key={Math.random()*10000}/>)
    }
    
    return (
        <div>
            <Form add={add}/>
            {entries}
        </div>
    )
}

export default App