import { Outlet, Link } from 'react-router-dom';

function Menu () {

    const address = window.location.origin;
    console.log(address);

    return (
        <>
            <div id="menu">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div className="dropdown-menu">
                    <p>Games</p>
                    <ul className="dropdown-content">
                        <li>
                            <Link to="/game/slot" className="right">Slot</Link>
                        </li>
                    </ul>
                </div>
                <div className="dropdown-menu">
                    <p>Profile</p>
                    <ul className="dropdown-content">
                        <li>
                            <Link to="/profile/login" className="right">Login</Link>
                        </li>
                        <li>
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