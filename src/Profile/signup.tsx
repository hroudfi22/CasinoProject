import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './singup.css';

function Signup() {

    const navigate = useNavigate();

    const [passworType1, setPasswordType1] = useState<string>("password");
    const [passworType2, setPasswordType2] = useState<string>("password");

    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const SendSignup = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password1 == "") {
            alert("No password entred");
            return;
        }
        if (password2 == "") {
            alert("No password (again) entred");
            return;
        }
        if (email == "") {
            alert("No email entred");
            return;
        }
        if (username == "") {
            alert("No username entred");
            return;
        }
        const response = await fetch("https://hroudfi22.sps-prosek.cz/casino/user.php",{
            method: "POST",
            body:JSON.stringify({
                type: "register",
                username: username,
                email: email,
                passw: password1
            }),
        })
        const data = await response.json();
        if (data["Error"] !== undefined) {
            console.log(Object.keys(data))
            alert(data["Error"]);
            return;
        }
        console.log("Signup was succesfull, you can now login");
        navigate("/casinoApp/profile/login");
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
                <form onSubmit={(e) => SendSignup(e)}>
                    <p id="title">Sign Up</p> 
                    <div>
                        <p>Username: </p>
                        <input id="username" type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <p>Email: </p>
                        <input id="email" type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <p>Password: </p>
                        <input id="password" type={passworType1} name="password" onChange={(e) => setPassword1(e.target.value)}/>
                        <input type="checkbox" id="password1visible1" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType1)}/>
                    </div>
                    <div>
                        <p>Password (Again): </p>
                        <input id="upasswordVerify" type={passworType2} name="passwordVerify" onChange={(e) => setPassword2(e.target.value)}/>
                        <input type="checkbox" id="password1visible2" onChange={(e : React.ChangeEvent<HTMLInputElement>) => checkBox(e.target.checked, setPasswordType2)}/>
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        </>
    )
}

export default Signup;