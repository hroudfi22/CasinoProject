import { Outlet, Link, useNavigate } from 'react-router-dom';

function Menu () {

    const navigate = useNavigate();
    const address = window.location.origin;
    console.log(address);

    return (
        <>
            <div id="menu">
                <div onClick={() => navigate("/casinoApp")}>
                    <Link to="/casinoApp">Home</Link>
                </div>
                <div className="dropdown-menu">
                    <p>Games▾</p>
                    <ul className="dropdown-content">
                        <li onClick={() => navigate("/casinoApp/game/slot")}>
                            <Link to="/casinoApp/game/slot" className="right">Slot</Link>
                        </li>
                        <li onClick={() => navigate("/casinoApp/game/roulette")}>
                            <Link to="/casinoApp/game/roulette" className="right">Roulette</Link>
                        </li>
                    </ul>
                </div>
                <div className="dropdown-menu">
                    <p>Profile▾</p>
                    <ul className="dropdown-content">
                        <li onClick={() => navigate("/casinoApp/profile/login")}>
                            <Link to="/casinoApp/profile/login" className="right">Login</Link>
                        </li>
                        <li onClick={() => navigate("/casinoApp/profile/signup")}>
                            <Link to="/casinoApp/profile/signup" className="right">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Menu