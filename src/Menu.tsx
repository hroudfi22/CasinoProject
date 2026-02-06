import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';

function Menu () {

    const address = window.location.origin;
    console.log(address);

    return (
        <>
            <div id="menu">
                <div>
                    <a href={address+"/"}>Home</a>
                </div>
                <div>
                    <a href={address+"/game/slot"}>Slot</a>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Menu