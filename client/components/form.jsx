import React, {useEffect} from 'react';
import axios from 'axios';




const Form = (props) => {
    function addToEntry(e){
        e.preventDefault();
        console.log(e)
        const [name, overall_rating, thoughts] = [e.target[1].value, e.target[2].value, e.target[3].value]
        e.target[1].value = '';
        e.target[2].value = '';
        e.target[3].value = '';
        axios.post('/', {
            name,
            overall_rating,
            thoughts
        })
        .then(res => props.add(res.data))
        .catch((err) => console.log(err))

    }
    return (
        <form className="createForm" onSubmit={addToEntry}>
            <h2>Post another entry! (Only if you're Jason)</h2>
            <fieldset className='form-field'>
                <label htmlFor="addMarket">Title: </label>
                <input type="text" id="title"></input>
                <label htmlFor="addMarket">Score: </label>
                <input type="text" id="score" placeholder='Range: 0-5'></input>
                <label htmlFor="comments">Provide a bio:</label>
                <textarea id="comments" name="comments" rows="3" cols="30" placeholder="What did you think about the drama?"></textarea>
            </fieldset>
            <button type="submit">Post</button>
      </form>
    )
}

export default Form;