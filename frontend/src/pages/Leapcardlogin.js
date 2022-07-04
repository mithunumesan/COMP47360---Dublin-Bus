import {useNavigate} from 'react-router-dom';
function LeapCardLogIn() {
    const navigate = useNavigate();
    const navigateToContent = () => {
        navigate('/leapcard');
    }
    return <div id="leapCardLog">
    <form action="" className="leapCard-login-form">
        <h3>First, please login to your leapCard account</h3>
        <input type="email" placeholder="enter your account" className="leapCard-box"></input>
        <input type="password" placeholder="enter your password" className="leapCard-box"></input>
        <input id="leapcardbtn"  type="submit" value="login now" className="leapCard-btn" onClick={navigateToContent}></input>
    </form>
</div>;
}
export default LeapCardLogIn;