import React, { useState } from "react";
import './CSS/LoginSignup.css'

//import { sendMail } from "../Service/SendMail";

//function generate(n) {
//    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
//    if ( n > max ) {
//            return generate(max) + generate(n - max);
//    }
    
//    max        = Math.pow(10, n+add);
//    var min    = max/10; // Math.pow(10, n) basically
//    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
//    return ("" + number).substring(add); 
//}

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    });


    const [message, setMessage] = useState('Your password must have: Minimum 8 digits, 1 upper and lowercase Letter')
    const [inputfilled, setInputFilled] = useState(false);
    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
        
       
    }
    //const [emailSent, setEmailSent] = useState(false);
    //const [emailVerified, setEmailVerified] = useState(false);
    //const verificationInput = '';
    const [verificationCount, setVerificationCount] = useState(1);

    const login = async () => {
        //console.log("Login Function Executed", formData);
        let responseData;
        await fetch('login',{
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

        //e.preventDefault();

        
        setVerificationCount(verificationCount + 1);
        if(verificationCount < 5){
            //const verificationCode = generate(6); 
            
            
            //let response = await sendMail(verificationCode);
            //setEmailSent(true);
        }
        
        
        
        function allCases(string) {
            const
                upper = /[A-Z]/.test(string),
                lower = /[a-z]/.test(string),
                number = /[0-9]/.test(string);
                
        
            return upper && lower && number;
        }

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
        
        
        if(allCases(formData.password)=== true && inputfilled ){ //&& emailVerified
            let responseData;
            
            await fetch('signup',{
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
        else if(allCases(formData.password)=== false && inputfilled === false){ // emailVerified === false
            if(EmailVer(formData.email)===false){
                setMessage("Enter a valid email address")
            }
            else{
                setMessage("Password must have at least 8 letters, 1 upper and lowercase letter")
            }
            
            
        }

        
    }

    

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Adress" />
                    <input name="password" value={formData.password} onChange={changeHandler}  type="password" placeholder="Your Password" /> 
                    {/*{emailSent? <input name="verifyEmail" value={verificationInput}  type="text" placeholder="Verification sent to your Email"/>:<></>} */}
                </div>
                {state==="Sign Up"? <main className="tracker-box"><p className={message==="Requirements: Minimum 8 letters, At least 1 upper and lowercase letter"?'validated':'non-validated'}>{message}</p></main>:<></>}
                
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"? <p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login</span></p> :
                <p className="loginsignup-login">Don't have an account?? <span onClick={() => {setState("Sign Up")}}>Register</span></p>}
                
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By Continuing, I agree to terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;

//http://localhost:4000/login
//http://localhost:4000/signup