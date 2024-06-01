import React, { useState } from "react";
import './CSS/LoginSignup.css'


function generate(n) {
    var add = 1, max = 12 - add;   
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    max        = Math.pow(10, n+add);
    var min    = max/10; 
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add); 
}
const verificationarray = [];

const LoginSignup = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleOverlayOpen = () => {
    setIsOverlayVisible(true);
  };

  const handleAgree = () => {
    setHasAgreed(true);
    setIsOverlayVisible(false);
  };

  const handleCheckboxChange = (event) => {
    setHasAgreed(event.target.checked);
  };
    const [elementDeleted, setElementDeleted] = useState(false)
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:"",
        verification:"",
        
    });
    const [passwordValid, setPasswordValid] = useState({ //micro
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validatePassword(value);
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLengthValid = password.length >= 8;

        setPasswordValid({
            length: isLengthValid,
            uppercase: hasUpperCase,
            lowercase: hasLowerCase,
            number: hasNumber,
        });
    };
    //micro

    //const [message, setMessage] = useState('Password must have at least 8 letters, 1 number, upper and lowercase letter')
    const [inputfilled, setInputFilled] = useState(false);
    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})    
    }
    const [emailSent, setEmailSent] = useState(false);
    const [verificationCount, setVerificationCount] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const login = async () => {
       
        const loginUrl = `${process.env.REACT_APP_API_LINK}/login`;
        let responseData;
        await fetch(loginUrl,{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
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
        if(elementDeleted===false){
            verificationarray.shift()
        }
        setElementDeleted(true)
              
        if(verificationarray.includes(formData.verification)){
            fetching()
        }
        else if((verificationarray.includes(formData.verification))===false){
          // setMessage("Email not verified")
           alert("Your Email is not verified")
        }
    }
    const fetching = async() =>{
            let responseData;
            const loginUrl = `${process.env.REACT_APP_API_LINK}/signup`;
            await fetch(loginUrl,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response)=> response.json()).then((data) =>responseData=data)
            if(responseData.success){
                localStorage.setItem('auth-token',responseData.token);
                window.location.replace("/");
            }
            else{
                alert(responseData.errors);
            }  
        }
    const signup = async () => {    
        let verify = true;
        let responseData;
        const loginUrl = `${process.env.REACT_APP_API_LINK}/signupCheck`;
            await fetch(loginUrl,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response)=> response.json()).then((data) =>responseData=data)
            if(responseData.success === false){
                alert(responseData.errors);
                verify=false;
            }
            else if(responseData.success){
                verify = true
            } 
            if(verify){
        setVerificationCode(generate(6));
        verificationarray.push(verificationCode);
                 
        function allCases(string) {
            const
                upper = /[A-Z]/.test(string),
                lower = /[a-z]/.test(string),
                number = /[0-9]/.test(string);
            return upper && lower && number;
        }
        const containsWhitespace = str => /\w\s+\w/.test(str);

        function EmailVer(string) {
            const
                email = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(string);
            return email;
        }

        if(formData.password.trim().length < 2 ||formData.email.trim().length < 2 || formData.username.trim().length < 2){

            //setMessage("Fill Out All input fields")
            setInputFilled(false)
        }
        else if(allCases(formData.password)=== true && formData.email.trim().length > 2 && formData.username.trim().length > 2){ 
            
            
                if(EmailVer(formData.email)===true){
                    setInputFilled(true)
                }
                
                else if(EmailVer(formData.email)===false){
                    //setMessage("Enter a valid email address")
                }
        }

        if(allCases(formData.password)=== true && inputfilled){
            if(verificationCount < 2){
                setVerificationCount(verificationCount + 1);
                const loginUrl = `${process.env.REACT_APP_API_LINK}/log-value`;
                try {
                    const response = await fetch(loginUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ to: formData.email, subject: "Email Verification Code", text:verificationCode}),
                    });
            
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    setEmailSent(true);
                } catch (error) {
                    alert(error);
                } 
            } 
            else if(verificationCount <! 5){
                alert("A verification has already been sent multiple times")
            }
        } 
        if(allCases(formData.password)=== false && inputfilled === false){ 
            if(containsWhitespace(formData.username)===true){ 
               // setMessage("No spaces are allowed in the username")
                setInputFilled(false)
            }
            else if(containsWhitespace(formData.username)===false){
                if(EmailVer(formData.email)===false){
                  //  setMessage("Enter a valid email address")
                }
                else{
                   // setMessage("Password must have at least 8 letters, 1 number, upper and lowercase letter")
                }
            }
        }  
        
    }
}
    return(
        <div className="loginsignup">
            {emailSent===false?
            <div className={"loginsignup-container-"+state}>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign-Up"? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Adress" />
                    <input name="password" value={formData.password} onChange={handleInputChange}  type="password" placeholder="Your Password" />      
                </div>
                
                {state === "Sign-Up" && (
                <div className="validation-icons">
                    <div className="validation-icon">
                        {passwordValid.length ? <span>&#10004;</span> : <span>&#10060;</span>}
                        <p>Password's length must be at least 8</p>
                    </div>
                    <div className="validation-icon">
                        {passwordValid.uppercase ? <span>&#10004;</span> : <span>&#10060;</span>}
                        <p>At least 1 uppercase letter</p>
                    </div>
                    <div className="validation-icon">
                        {passwordValid.lowercase ? <span>&#10004;</span> : <span>&#10060;</span>}
                        <p>At least 1 lowercase letter</p>
                    </div>
                    <div className="validation-icon">
                        {passwordValid.number ? <span>&#10004;</span> : <span>&#10060;</span>}
                        <p>At least 1 number</p>
                    </div>
                </div>
            )}
                {state==="Sign-Up"? 
                <div className="loginsignup-agree">
                    <input 
        type="checkbox" 
        checked={hasAgreed} 
        onChange={handleCheckboxChange} 
      />
                    <p>I agree to <span className="privacyspan" onClick={handleOverlayOpen}>terms of use & privacy policy</span></p>
                </div>
                :<></>}

                {isOverlayVisible && (
                        <div className="overlay">
                        {/* Overlay content goes here */}
                        
                        <div className="terms-content">
                        <p>Temporary terms of use and privacy policy text</p>
                            {/* Terms of Use and Privacy Policy text */}
                        </div>
                        <button onClick={handleAgree}>I Agree</button>
                        </div>
                    )}

                    

                                        <button onClick={() => {
                    if (state !== "Login") {
                        if(hasAgreed){
                            signup();
                        }
                        else{
                            alert("Agree the terms of service")
                        }
                        
                    } else if (state === "Login") {
                        login();
                    }
                    }}>Continue</button>
                {state==="Sign-Up"? <p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login</span></p> :
                <p className="loginsignup-login">Don't have an account?? <span onClick={() => {setState("Sign-Up")}}>Register</span></p>}
            </div>
            : <div className="loginsignup-container-Login">
                <h1>Code sent to your email</h1>
                <div className="loginsignup-fields">
                <div className="verifyButton"><input name="verification" value={formData.verification} onChange={changeHandler}  type="text" placeholder="Verification sent to your Email"/><button className="verifybut" onClick={()=>{verificationProcess()}}>Verify</button></div> 
                </div>
                </div>
            }
        </div>
    )
}
export default LoginSignup;

