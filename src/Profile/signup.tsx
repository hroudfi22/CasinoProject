import { useState } from "react";

function Signup() {
    const [passworType1, setPasswordType1] = useState<string>("password");
    const [passworType2, setPasswordType2] = useState<string>("password");

    const checkBox = (value : boolean, setVisible : Function) => {
        if (value) {
            setVisible("text");
        } else {
            setVisible("password");
        }
    }

    return (
        <>
            <link rel="stylesheet" href="/src/Profile/singup.css"/>
            <div id="main-content">
                <form>
                    <p id="title">Sign Up</p> 
                    <div>
                        <p>Username: </p>
                        <input id="username" type="text" name="username"/>
                    </div>
                    <div>
                        <p>Email: </p>
                        <input id="email" type="email" name="email"/>
                    </div>
                    <div>
                        <p>Password: </p>
                        <input id="password" type={passworType1} name="password"/>
                        <input type="checkbox" id="password1visible1" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType1)}/>
                    </div>
                    <div>
                        <p>Password (Again): </p>
                        <input id="upasswordVerify" type={passworType2} name="passwordVerify"/>
                        <input type="checkbox" id="password1visible2" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType2)}/>
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        </>
    )
}

export default Signup;