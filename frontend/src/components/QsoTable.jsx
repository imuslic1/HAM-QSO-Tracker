import { useEffect, useState } from "react";
import axios from "axios";

export default function QsoTable() {
  const [qsos, setQsos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/qsos") // <-- endpoint in server.js
      .then(res => setQsos(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = qsos.filter(q =>
    q.callsign.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Past QSOs</h2>
      <input
        type="text"
        placeholder="Search by callsign..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Callsign</th>
            <th className="border p-2">Signal</th>
            <th className="border p-2">Channel</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Device</th>
            <th className="border p-2">Power</th>
            <th className="border p-2">QRA Locator</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2">{new Date(q.createdAt).toLocaleString()}</td>
              <td className="border p-2">{q.callsign}</td>
              <td className="border p-2">{q.signalReport}</td>
              <td className="border p-2">{q.channel}</td>
              <td className="border p-2">{q.name}</td>
              <td className="border p-2">{q.device}</td>
              <td className="border p-2">{q.power}</td>
              <td className="border p-2">{q.qraLocator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
