import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ( { loggedIn } ) => (
    <div>
        <Link style={ { "margin-right": "10px" } } to="/">Home</Link>
        <Link style={ { "margin-right": "10px" } } to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        { loggedIn && <Link to="/secret">Secret</Link> }
    </div>
);

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
} );

export default connect( mapStateToProps )( Header );
