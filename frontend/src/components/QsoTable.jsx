import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QsoTable.css"; // import the external stylesheet

const QsoTable = () => {
    const [qsos, setQsos] = useState([]);
    const [filteredQsos, setFilteredQsos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchQsos();
    }, []);

    const fetchQsos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/qsos/all");
            setQsos(res.data);
            setFilteredQsos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toUpperCase();
        setSearch(value);

        if (value.trim() === "") {
            setFilteredQsos(qsos);
        } else {
            const results = qsos.filter((qso) =>
                qso.callsign.toUpperCase().includes(value)
            );
            setFilteredQsos(results);
        }
    };

    return (
        <div className="qso-table-container">
            <h2>Past QSOs</h2>
            <input
                type="text"
                placeholder="Search by callsign..."
                value={search}
                onChange={handleSearch}
                className="search-input"
            />
            <table className="qso-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Callsign</th>
                        <th>Signal Report</th>
                        <th>Channel/Repeater</th>
                        <th>Name</th>
                        <th>Device</th>
                        <th>Power</th>
                        <th>QRA Locator</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredQsos.map((qso) => (
                        <tr key={qso.id}>
                            <td>{new Date(qso.created_at).toLocaleString()}</td>
                            <td>{qso.callsign}</td>
                            <td>{qso.signal_report}</td>
                            <td>{qso.channel}</td>
                            <td>{qso.name}</td>
                            <td>{qso.device}</td>
                            <td>{qso.power}</td>
                            <td>{qso.qth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QsoTable;
