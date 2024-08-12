
import '../App.css';

function ResetPassword() {
  
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
        <h1 className="email-verify text-start">Reset Password</h1>
        <input type="text" id="username" className="login-input-field" placeholder="Username" onChange = {(e) => setData({...data, username : e.target.value})}/>
        <button type="submit" className="login-submit-button">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;


