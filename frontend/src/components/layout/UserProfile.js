import Home from "../../pages/Home";

function UserProfile() {
    return (<>
        <form className="login-form">
            <h3>My Profile</h3>
            {/* <table id="user">
                <tr>
                    <th>Start Point</th>
                    <th>Destination</th>
                    <th>Autocomplete</th>
                </tr>
            </table> */}
            {<Home />}
        </form> 
        
        </>
    )
} 

export default UserProfile;