import React, {useState, useEffect} from "react";
import Drama from "./components/drama"
import Form from "./components/form"
import "./scss/application.scss";


const App =  () =>{
    const [entryNum, setEntryNum] = useState(5);
    const [state, setData] = useState([])
    useEffect(() => {
        fetch('/entries')
        .then(res=>{
            console.log(res);
            return res.json()})
        .then(data => {
            console.log("this is the data: ", `${JSON.stringify(data)}`)
            setData(data)
        })
        .catch(err => console.log("Failed to get character: ", err));
    }, []);

    const entries = []
    for (let i = 0; i < state.length; i++){
        entries.push(<Drama {...state[i]} num={'num'+i} key={Math.random()*10000}/>)
    }
    return (
        <div>
            <Form/>
            {entries}
        </div>
    )
}

export default App