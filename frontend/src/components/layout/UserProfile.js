function UserProfile() {
    return (
        <form className="login-form">
            <h3>My Profile</h3>
            <p>Select Your Favorite Route</p>
            <table id="user">
                <tr>
                    <th>Start Point</th>
                    <th>Destination</th>
                    <th>Autocomplete</th>
                </tr>
            </table>
        </form> 
    )
} 

export default UserProfile;