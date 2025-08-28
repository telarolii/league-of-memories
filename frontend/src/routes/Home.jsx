// Axios
import axios from "../axios-config";

// Hooks
import { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Styles
import "./Home.css";

const Home = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const getMemories = async () => {
      const res = await axios.get("/memories");

      setMemories(res.data);
    };

    getMemories();
  }, []);

  return (
    <main>
      <div className="home">
        <h2>Confira as últimas Memórias de League of Legends</h2>
        <div className="memories-container">
          {memories.length > 0 &&
            memories.map((memory) => (
              <div className="memory" key={memory._id}>
                <img
                  src={`${axios.defaults.baseURL}/${memory.src}`}
                  alt={memory.title}
                />
                <p>{memory.title}</p>
                <Link className="btn" to={`/memories/${memory._id}`}>
                  Ver Mais
                </Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
