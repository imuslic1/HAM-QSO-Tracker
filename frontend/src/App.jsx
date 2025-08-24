import { useState } from "react";
import Header from "./components/Header";
import QsoForm from "./components/QsoForm";
import QsoTable from "./components/QsoTable";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "form" | "table"

  return (
    <div >
      <Header setPage={setPage} />

      <main className="p-6">
        {page === "home" && <h1 className="text-2xl font-bold">Welcome to the HAM QSO Logbook</h1>}
        {page === "form" && <QsoForm />}
        {page === "table" && <QsoTable />}
      </main>
    </div>
  );
}
