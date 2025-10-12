export default function Register() {

    return (
        <div className="register-form">
            <h1>Create Profile</h1>
            <form>
                <label htmlFor="userName">User Name:</label>
                <input id="register-username" type="text" name="userName" maxLength={255} placeholder="e.g., ConcertGoer55" required/>

                <label htmlFor="password">Password:</label>
                <input id="register-password" type="password" name="password" placeholder="e.g., asdf89!!" maxLength={16} required/>
                
                <label htmlFor="phone">Phone Number:</label>
                <input id="register-phone" type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required/>


                <fieldset>
                    <legend>Phone Type</legend>
                    <label>
                        <input type="radio" name="phoneType" value="mobile" defaultChecked={true} />
                        Mobile
                    </label>
                    <label>
                        <input type="radio" name="phoneType" value="home" />
                        Home
                    </label>
                    </fieldset>
                
                <button type="submit">Save</button>
            </form>
                <button type="button">Cancel</button> 
        </div> 
    )
}