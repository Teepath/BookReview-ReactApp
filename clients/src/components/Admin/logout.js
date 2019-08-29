import React from 'react';
import axios from 'axios';


function Logout(props){
    
let request =axios.get('/api/logout')
.then(response => response.data)
    setTimeout(()=>{
        props.history.push('/')
    }, 2000)

    return (
        <div className = " logout_container">
            <h1>
            
             sorry to see you go :(
            </h1>
            
            
        </div>
    )
}

export default Logout

    