export const sendMail = async (link) => {
  try {
    let request = await fetch('https://eucway-apis.onrender.com/api/email',{
        method:'POST', 
        body: {
            name: "Malith",
            email: "malith@sendinblue.com",
            subject: "Someone sent you a Link.",
            msg: link,
        }
        
      })
      .then((res) => {
        return res;
      });
    return request.status === 200 ? true : false;;
  } catch (err) {
    console.error(err);
  }
};