import React, { useState } from "react";
import './CSS/LoginSignup.css'
//import { useEffect } from "react";
//import { useHistory } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";


function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}
const verificationarray = [];





const LoginSignup = () => {
    
    //const navigate = useNavigate();
    //const [passValidated, setpassValidated] = useState(true)
    const [elementDeleted, setElementDeleted] = useState(false)
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:"",
        verification:"",
        
    });
    
    
    const [message, setMessage] = useState('Password must have at least 8 letters, 1 number, upper and lowercase letter')
    const [inputfilled, setInputFilled] = useState(false);
    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
        
        
    }
    //const verifychangeHandler = (e) => {
    //    const verify = e.target.verify
    //    setVerifyHand(verify)
    //}
    
    const [emailSent, setEmailSent] = useState(false);
    //useEffect(() => {
    //    if (emailSent) {
    //        history.push('/verification');
    //    }
    //}, [emailSent, history]);
    //const [emailVerified, setEmailVerified] = useState(false);
    
   
    const [verificationCount, setVerificationCount] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    
    const login = async () => {
        //console.log("Login Function Executed", formData);
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
           
            //setEmailVerified(true)
            fetching()
        }
        else if((verificationarray.includes(formData.verification))===false){
           setMessage("Email not verified")
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
            

        //console.log(verificationCode);
        setVerificationCode(generate(6));
        verificationarray.push(verificationCode);
        //console.log(verificationarray)
                 
        function allCases(string) {
            const
                upper = /[A-Z]/.test(string),
                lower = /[a-z]/.test(string),
                number = /[0-9]/.test(string);
            return upper && lower && number;
        }
        const containsWhitespace = str => /\w\s+\w/.test(str);
        //const containsWhitespace = str => /\s/.test(str);
        ///function checkUsername(string){
        //    const whitespace = str => /\s/.test(str);
        //    return whitespace;
        //}

        function EmailVer(string) {
            const
                email = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(string);
            return email;
        }

        if(formData.password.trim().length < 2 ||formData.email.trim().length < 2 || formData.username.trim().length < 2){

            setMessage("Fill Out All input fields")
            setInputFilled(false)
        }
        else if(allCases(formData.password)=== true && formData.email.trim().length > 2 && formData.username.trim().length > 2){  //problem rises when @ is used
            
            
                if(EmailVer(formData.email)===true){
                    setInputFilled(true)
                }
                
                else if(EmailVer(formData.email)===false){
                    setMessage("Enter a valid email address")
                }
            


            
            
        }

        if(allCases(formData.password)=== true && inputfilled){
            //setpassValidated(true)
            //let variable = generate(6)
        
            if(verificationCount < 2){
                setVerificationCount(verificationCount + 1);
                //console.log(verificationCode)
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
                    //navigate('/verification');
                } catch (error) {
                    alert(error);
                } 
                
            } 
            else if(verificationCount <! 5){
                alert("A verification has already been sent multiple times")
            }
        } 
        
        
        
        if(allCases(formData.password)=== false && inputfilled === false){ 
            if(containsWhitespace(formData.username)===true){  //add this to nested loop
                setMessage("No spaces are allowed in the username")
                setInputFilled(false)
                
            }
            else if(containsWhitespace(formData.username)===false){
                if(EmailVer(formData.email)===false){
                
                    setMessage("Enter a valid email address")
                }
                else{
                    
                    setMessage("Password must have at least 8 letters, 1 number, upper and lowercase letter")
                }
            }
            
            
            
        }
        
        //else if(allCases(formData.password)=== false && inputfilled === true ){
        //    setpassValidated(false)
       // }

        
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
                    <input name="password" value={formData.password} onChange={changeHandler}  type="password" placeholder="Your Password" /> 
                    
                    
                </div>
                {state==="Sign-Up"? <main className="tracker-box"><p className={'s'/*passValidated===false?'validated':'non-validated'*/}>{message}</p></main>:<></>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>I agree to terms of use & privacy policy</p>
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
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

