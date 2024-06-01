import LoginSignup from '../Pages/LoginSignup';
import { useState } from 'react';

function Verification() {
  const fetching = async() =>{
        
    let responseData;
    const loginUrl = `${process.env.REACT_APP_API_LINK}/signup`;
    await fetch(loginUrl,{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',

        },
        body: JSON.stringify(LoginSignup.formData),
    }).then((response)=> response.json()).then((data) =>responseData=data)
    if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
    }
    else{
        alert(responseData.errors);
    } 

}

  const verificationProcess = () =>{
    //if(elementDeleted===false){
    //    verificationarray.shift()
    //}
    //setElementDeleted(true)
    
    
    if(LoginSignup.verificationarray.includes(formData.verification)){
       
        LoginSignup.setEmailVerified(true)
        fetching()
    }
    else if((LoginSignup.verificationarray.includes(formData.verification))===false){
       LoginSignup.setMessage("Email not verified")
       alert("Your Email is not verified")
    }
    
    
}
    const [formData, setFormData] = useState({
        verification:"",
        
    });

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
        
        
    }
  return(
    
    <div className="verifyButton">
      
        <input name="verification" value={formData.verification} onChange={changeHandler}  type="text" placeholder="Verification sent to your Email"/>
        <button className="verifybut" onClick={()=>{verificationProcess()}}>Verify</button> 
    </div>

  )
  
}

export default Verification;
