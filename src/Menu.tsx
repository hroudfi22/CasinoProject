import { Outlet, Link, useNavigate } from 'react-router-dom';

function Menu () {

    const navigate = useNavigate();
    const address = window.location.origin;
    console.log(address);

    return (
        <>
            <div id="menu">
                <div onClick={() => navigate("/")}>
                    <Link to="/">Home</Link>
                </div>
                <div className="dropdown-menu">
                    <p>Games▾</p>
                    <ul className="dropdown-content">
                        <li onClick={() => navigate("/game/slot")}>
                            <Link to="/game/slot" className="right">Slot</Link>
                        </li>
                        <li onClick={() => navigate("/game/roulette")}>
                            <Link to="/game/roulette" className="right">Roulette</Link>
                        </li>
                    </ul>
                </div>
                <div className="dropdown-menu">
                    <p>Profile▾</p>
                    <ul className="dropdown-content">
                        <li onClick={() => navigate("/profile/login")}>
                            <Link to="/profile/login" className="right">Login</Link>
                        </li>
                        <li onClick={() => navigate("/profile/signup")}>
                            <Link to="/profile/signup" className="right">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Menu