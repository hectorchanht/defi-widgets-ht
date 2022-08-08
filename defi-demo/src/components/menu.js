import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <section className="menu">
            <Link to="/connector">Connector</Link>
            <Link to="/contract">Contract-Interact</Link>
            <Link to="/confirm">Transaction-Confirm</Link>
            <Link to="/transaction">Transaction-Confirm</Link>
            <Link to="/tokenlist">Token-List</Link>
            <Link to="/signsteps">Sign-Steps</Link>
        </section>
    )
}

export default Menu;