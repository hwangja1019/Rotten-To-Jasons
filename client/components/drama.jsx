import React, {useState} from 'react';
import axios from 'axios';
import Image from './img.jsx'

    

function changeIt(name, num){
    const btn = document.querySelector(`#${num}`);
    const content = btn.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
        btn.innerHTML = `<h2>${name}</h2><p>+</p>`
    } else {
        content.style.display = "block";
        btn.innerHTML = `<h2>${name}</h2><p>-</p>`
    }
}


const Drama = (props) => {
    const [imgSrc, setImgSrc] = useState("Invalid Image Source");

    console.log("this is the prop:", JSON.stringify(props))
    function editIt(){
        const newObj = {...props, edit:true, open: true};
        props.change(newObj, props.num);
    }

    function deleteIt(_id){
        console.log("deleteIt _id: ", _id);
        axios.delete('/delete', {
            data: {_id}
        })
        .then(res => {console.log(res)})
        .catch(err => console.log(err))
        props.change({}, props.num, true)
    }
    function submitEdit(e){
        e.preventDefault();
        const [name, overall_rating, thoughts] = [e.target[1].value, e.target[2].value, e.target[3].value]
        const _id = props._id;
        axios.patch('/edit', {
            _id,
            name,
            overall_rating,
            thoughts
        })
        .then(res => {
            const newObj = {...res, edit: false}
            props.change(res.data, props.num)})
        .catch((err) => console.log(err))

    }
    let images = [];
    for (let i = 0; i < Math.round(props.overall_rating); i++){
        images.push(<Image/>)
    }
    const displayMode = (<div className='entryContainer'>
        <button className='collapsible' id={props.num} onClick={()=>changeIt(props.name, props.num)}>
            <h2>{props.name}</h2>
            <p>+</p>
        </button>
        <div className="dramaEntry">
            <p>Rating: {props.overall_rating}</p>
            {images}
            <p>Comments: </p>
            <p className="commentBox">
                {props.thoughts}
            </p>
            <div className='btnContainer'>
                <button onClick={() => editIt(props._id)}>Edit</button>
                <button onClick={()=> deleteIt(props._id)}>Delete</button>
            </div>
        </div>
    </div>);

    const editMode = (
    <div className='entryContainer'>
        <button className='collapsible' id={props.num} onClick={()=>changeIt(props.name, props.num)}>
            <h2>{props.name}</h2>
            <p>-</p>
        </button>
        <div className="dramaEntryEdit">
            <form onSubmit={submitEdit}>
                <fieldset className='form-field'>
                    <label htmlFor="addTitle">Title: </label>
                    <input type="text" id="title" defaultValue={props.name}></input>
                    <label htmlFor="addMarket">Score: </label>
                    <input type="text" id="score" defaultValue={props.overall_rating}></input>
                    <label htmlFor="comments">Provide a bio:</label>
                    <textarea id="comments" name="comments" rows="3" cols="30" defaultValue={props.thoughts}></textarea>
                </fieldset>
                <button type="submit">Edit</button>
            </form>
        </div>
    </div>
    )
    return props.edit? editMode : displayMode;
//     return (
//     <div>
//         <button className='collapsible' id={props.num} onClick={()=>changeIt(props.name, props.num)}>
//             <h2>{props.name}</h2>
//             <p>+</p>
//         </button>
//         <div className="dramaEntry">
//             <p>Rating: {props.overall_rating}</p>
//             <p>Comments: </p>
//             <p className="commentBox">
//                 {props.thoughts}
//             </p>
//             <div className='btnContainer'>
//                 <button onClick={() => editIt(props._id)}>Edit</button>
//                 <button onClick={()=> deleteIt(props._id)}>Delete</button>
//             </div>
//         </div>
//     </div>

// )
}

export default Drama;