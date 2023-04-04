import "./login.css"
import wave from "./wave.png"
import avatar from "./avatar.svg"
import bg from "./bg.svg"
const Login = () => {
  return (
    <div>
    <title>Animated Login Form</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <img className="wave" src={wave} />
    <div className="container">
      <div className="img">
        <img src={bg} />
      </div>
      <div className="login-content">
        <form action="index.html">
          <img src={avatar}/>
          <h2 className="title">Bonjour</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user" />
            </div>
            <div className="div">
              <h5>Username</h5>
              <input type="text" className="input" />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i"> 
              <i className="fas fa-lock" />
            </div>
            <div className="div">
              <h5>Password</h5>
              <input type="password" className="input" />
            </div>
          </div>
          <a href="#">Forgot Password?</a>
          <input type="submit" className="btn" defaultValue="Login" />
        </form>
      </div>
    </div>
  </div>  )
}

export default Login