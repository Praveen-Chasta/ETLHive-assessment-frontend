
import '../App.css';

function EmailVerify() {
  



  const onFormSubmition = async(e) => {
    e.preventDefault();
    
     
    const {username, password} = data

    try {
     
    } catch (error) {
   
    }

  };

  return (
    <div className="login-form-container">
      <form onSubmit={onFormSubmition} className="login-form-element">
        <h1 className="email-verify text-start">Email</h1>
        <input type="email" id="username" className="login-input-field" placeholder="Email" onChange = {(e) => setData({...data, username : e.target.value})}/>
        <button type="submit" className="login-submit-button">Send</button>
      </form>
    </div>
  );
}

export default EmailVerify;


