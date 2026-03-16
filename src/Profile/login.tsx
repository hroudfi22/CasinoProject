import { useState } from "react";

function Login() {
    const [passworType, setPasswordType] = useState<string>("password");

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
                        <p>Email or username: </p>
                        <input id="email" type="email" name="email"/>
                    </div>
                    <div>
                        <p>Password: </p>
                        <input id="password" type={passworType} name="password"/>
                        <input type="checkbox" id="password1visible1" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType)}/>
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        </>
    )
}

export default Login;