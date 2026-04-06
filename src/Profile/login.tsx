import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

export function Login() {
    const navigate = useNavigate();
    const [passworType, setPasswordType] = useState<string>("password");
    const [password, setPassword] = useState<string>("");
    const [usernamemail, setUsernamemail] = useState<string>("");

    const SendLogin = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password == "") {
            alert("No password entred");
            return;
        }
        if (usernamemail == "") {
            alert("No username or email entred");
            return;
        }
        const response = await fetch("https://hroudfi22.sps-prosek.cz/casino/user.php",{
            method: "POST",
            body:JSON.stringify({
                type: "login",
                usernameEmail: usernamemail,
                password: password,
            }),
        })
        const data = await response.json();
        if (data["Error"] !== undefined) {
            console.log(Object.keys(data))
            alert(data["Error"]);
            return;
        }
        console.log("Login was succesfull, your token is: "+data["token"]);
        //console.log("userToken: "+userToken);
        //navigate("/casinoApp/");
    }


    const checkBox = (value : boolean, setVisible : Function) => {
        if (value) {
            setVisible("text");
        } else {
            setVisible("password");
        }
    }

    return (
        <>
            <div id="main-content">
                <form onSubmit={(e) => SendLogin(e)}>
                    <p id="title">Sign Up</p> 
                    <div>
                        <p>Email or username: </p>
                        <input id="email" type="text" name="email" onChange={(e) => setUsernamemail(e.target.value)}/>
                    </div>
                    <div>
                        <p>Password: </p>
                        <input id="password" type={passworType} name="password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="checkbox" id="password1visible1" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType)}/>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </>
    )
}