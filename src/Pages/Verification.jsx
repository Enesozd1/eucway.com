import LoginSignup from '../Pages/LoginSignup'
import { useState } from 'react';

function Verification() {
    const [formData, setFormData] = useState({
        verification:"",
        
    });

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
        
        
    }
  return(
    <div className="verifyButton">
        <input name="verification" value={LoginSignup.formData.verification} onChange={changeHandler}  type="text" placeholder="Verification sent to your Email"/>
        {/*<button className="verifybut" onClick={()=>{verificationProcess()}}>Verify</button> */}
    </div>

  )
  
}

export default Verification;
