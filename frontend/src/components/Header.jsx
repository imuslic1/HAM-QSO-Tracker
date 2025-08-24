export default function Header({ setPage }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="flex space-x-4 p-4">
        <button
          onClick={() => setPage("home")}
          className="hover:bg-blue-700 px-3 py-2 rounded"
        >
          Home
        </button>
        <button
          onClick={() => setPage("form")}
          className="hover:bg-blue-700 px-3 py-2 rounded"
        >
          QSO Entry
        </button>
        <button
          onClick={() => setPage("table")}
          className="hover:bg-blue-700 px-3 py-2 rounded"
        >
          Past QSOs
        </button>
      </nav>
    </header>
  );
}
