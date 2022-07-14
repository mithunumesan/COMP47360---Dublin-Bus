function LoginForm() {
return(
<form action="" className="login-form">
            <h3>log In</h3>
            <input type="email" placeholder="enter your email" className="box"></input>
            <input type="password" placeholder="enter your password" className="box"></input>
            <div className="remember">
                <input type="checkbox" name="" id="remember-me"></input>
                <label for="remember-me">remember me</label>
            </div>
            <input type="submit" value="login now" className="btn"></input>
            <p>don't have an account? <button>Sign Up</button></p>
        </form>)
}

export default LoginForm;