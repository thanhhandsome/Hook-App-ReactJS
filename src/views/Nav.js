import '../views/Nav.scss';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {


    return (
        <div className="topnav">
            <NavLink activeClassName="active" to="/" exact>Home</NavLink>
            <NavLink activeClassName="active" to="/timer">Timer</NavLink>
            <NavLink activeClassName="active" to="/app">App</NavLink>
            <NavLink activeClassName="active" to="/blog">Blog</NavLink>
        </div>

    );
}

export default Nav;