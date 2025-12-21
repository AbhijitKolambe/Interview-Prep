import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

// -------------------- TYPES --------------------
interface User {
  id: number;
  name: string;
  email: string;
}

// -------------------- DEBOUNCE FUNCTION --------------------
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ==================== APP COMPONENT ====================
const App: React.FC = () => {
  // BASIC STATE
  const [usersAxios, setUsersAxios] = useState<User[]>([]);
  const [usersFetch, setUsersFetch] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------- AXIOS API CALL --------------------
  const fetchUsersWithAxios = async () => {
    try {
      setLoading(true);
      const res = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsersAxios(res.data);
    } catch (err) {
      setError("Axios API Failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- FETCH + PROMISE API CALL --------------------
  const fetchUsersWithFetch = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsersFetch(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Fetch API Failed");
        setLoading(false);
      });
  };

  // -------------------- CALL APIs ON MOUNT --------------------
  useEffect(() => {
    fetchUsersWithAxios();
    fetchUsersWithFetch();
  }, []);

  // -------------------- OPTIMIZED SEARCH (useMemo) --------------------
  const filteredUsers = useMemo(() => {
    return usersAxios.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, usersAxios]);

  // -------------------- DEBOUNCED SEARCH HANDLER --------------------
  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 400);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>✅ React API + Search Example (App.tsx)</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{ padding: 8, width: 250, marginBottom: 20 }}
      />

      {/* LOADING & ERROR */}
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* AXIOS DATA */}
      <h2>🚀 Users from Axios API</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <hr />

      {/* FETCH DATA */}
      <h2>🌐 Users from Fetch + Promise</h2>
      <ul>
        {usersFetch.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
