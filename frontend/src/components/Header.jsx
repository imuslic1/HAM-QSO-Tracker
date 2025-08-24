import React from "react";
import "./Header.css";

export default function Header({ setPage, callsign }) {
    return (
        <header className="header-main">
            <div className="header-logo">{callsign}</div>

            <nav className="header-nav">
                <button onClick={() => setPage("home")} className="header-button">Home</button>
                <button onClick={() => setPage("form")} className="header-button">QSO Entry</button>
                <button onClick={() => setPage("table")} className="header-button">Past QSOs</button>
            </nav>
        </header>
    );
}
