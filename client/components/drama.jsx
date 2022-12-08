import React from 'react';



    

function changeIt(name, id){
    const btn = document.querySelector(`#${id}`);
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
    console.log("this is the prop:", JSON.stringify(props))

    return (
    <div>
        <button className='collapsible' id={props.num} onClick={()=>changeIt(props.name, props.num)}>
            <h2>{props.name}</h2>
            <p>+</p>
        </button>
        <div className="dramaEntry">
            <p>Rating: {props.overall_rating}</p>
            <p>Comments: </p>
            <p className="commentBox">
                {props.thoughts}
            </p>
            {/* <p>Name: </p>
            <p>Rating: </p>
            <p>Comments:</p> */}
        </div>
    </div>

)}

export default Drama;