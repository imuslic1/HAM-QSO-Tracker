import React, { useState } from "react";
import './QsoForm.css';

export default function QsoForm() {
    const [form, setForm] = useState({
        callsign: "",
        name: "",
        qth: "",
        channel: "",
        signal_report: "",
        device: "",
        power: "",
        band: ""
    });

    const [error, setError] = useState("");
      
    // fetch last QSO when callsign is entered
    const handleCallsignBlur = async () => {
        if (!form.callsign) return;
        const res = await fetch(`http://localhost:5000/qso/${form.callsign}`);
        const data = await res.json();
        if (data.callsign) {
            setForm({ ...form, ...data, callsign: form.callsign });
        }
        if (data.id) {
            const { id, ...rest } = data;
            setForm({ ...form, ...rest, callsign: form.callsign });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are empty
        const allFieldsEmpty = Object.values(form).every((v) => v.trim() === "");
        if (allFieldsEmpty) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        await fetch("http://localhost:5000/qso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        window.alert("QSO saved!");
        setForm({
            callsign: "",
            signal_report: "",
            channel: "",
            name: "",
            device: "",
            power: "",
            qth: "",
            band: ""
        });
    };

    const handleReset = () => {
        setForm({
            callsign: "",
            signal_report: "",
            channel: "",
            name: "",
            device: "",
            power: "",
            qth: "",
            band: ""
        });
        setError("");
    };

    return (
        <div style={{ fontFamily: "Montserrat" }} className="form-container">
            <p style={{ color: "red", textAlign: "left" }}>WORK IN PROGRESS</p>

            <form
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >

                <h1 style={{ fontWeight: "500", textAlign: "center" }}>[CALLSIGN] Ham Radio Logbook</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {["callsign", "name", "qth", "channel", "signal_report", "device", "power", "band"].map((field) => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        value={form[field]}
                        placeholder={field.replace("_", " ").toUpperCase()}
                        onChange={handleChange}
                        onBlur={field === "callsign" ? handleCallsignBlur : undefined}
                        className="input-field"
                    />
                ))}
                <br />
                <button
                    type="submit"
                    className="submit-button"
                >
                    Save QSO
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="clear-form-button"
                >
                    Clear
                </button>
            </form>
        </div>

    );
}
