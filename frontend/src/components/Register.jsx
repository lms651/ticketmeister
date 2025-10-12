export default function Register() {

    return (
        <div className="register-form">
            <h1>Create Profile</h1>
            <form>
                <label htmlFor="userName">User Name:</label>
                <input id="register-username" type="text" name="userName" maxLength={255} placeholder="e.g., ConcertGoer55" required/>

                <label htmlFor="password">User Name:</label>
                <input id="register-password" type="password" name="password" maxLength={16} required/>
                <button type="submit">Save</button>
            </form>
                <button type="button" onClick={() => navigate("/")}>Cancel</button> 
        </div> 
    )
}