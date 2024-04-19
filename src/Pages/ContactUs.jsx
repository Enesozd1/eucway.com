import React, { useState } from 'react';
import './CSS/ContactUs.css'
const ContactUs = () => {
    const [message, setMessage] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const [email, setEmail] = useState({
        email:""
    });

    const handleEmailChange = (event) => {
        setEmail({ email: event.target.value });
        //setEmail(event.target.value);
    }

    const handleInputChange = (event) => {
        const inputMessage = event.target.value;
    setMessage(inputMessage);
    const words = inputMessage.trim().split(' ');
    const count = words.filter(word => word !== '').length;
    if (count <= 500) {
        setWordCount(count);
    }
    //setEmail({ email: inputMessage });
    };
    

    const sendEmail = async () => {
        const contacturl = `${process.env.REACT_APP_API_LINK}/usercontact`;

        fetch(contacturl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                to: "tripcinemas@gmail.com", 
                subject: "Contact Us form", 
                text:"from: " + email.email + "\nmessage: " + message
            }),
        
            
        })
        alert('Your Message Has been sent')
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //sendEmail()
        //const addtocartUrl = `${process.env.REACT_APP_API_LINK}/findcontact`;
        if(localStorage.getItem('auth-token')){
            
            if(email.email.trim() === '' || message.trim() === '') {
                alert('Both fields must be filled out');
                
            }
            else if(email.email.trim() !== '' && message.trim() !== ''){
                const contactUrl = `${process.env.REACT_APP_API_LINK}/findcontact`;
                fetch(contactUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(email),
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.success) {
                        
                        sendEmail()
                    } else{
                        alert("Email not found / 24 Hours didn't pass")
                    }
                    
            })
                }
       
        else{
            alert("You have to sign in")
        }
    };
}

    return (
        <div className="contact-us">
    <h1>Contact Us</h1>
    <p className="warning">You can send 1 message per day.</p>
    <form onSubmit={handleSubmit}>
        <label>
            Email:
            <input type="email" name="email" onChange={handleEmailChange} placeholder='Same email as your account' />
        </label>
        <label>
            Message:
            <textarea name="message" value={message} onChange={handleInputChange} />
        </label>
        <p>{wordCount}/500 words</p>
        
        <input type="submit" value="Submit" disabled={wordCount > 500} />
    </form>
</div>

    );
};

export default ContactUs;
