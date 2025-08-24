import { useState } from "react";
import "leaflet/dist/leaflet.css";
import Header from "./components/Header";
import QsoForm from "./components/QsoForm";
import QsoTable from "./components/QsoTable";
import Home from "./pages/Home";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "form" | "table"

  return (
    <div >
      <Header setPage={setPage} callsign="JN74WT" />

      <main className="p-6">
        {page === "home" && <Home qraLocator="E72DDM" />}
        {page === "form" && <QsoForm />}
        {page === "table" && <QsoTable />}
      </main>
    </div>
  );
}
