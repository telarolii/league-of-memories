// Axios
import axios from "../axios-config";

// Hooks
import { useState } from "react";

// React Toastify
import { toast } from "react-toastify";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Styles
import "./AddMemory.css";

const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.msg);
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0]);
    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    }
  };

  // {a:1}
  // {a: 1, b: 2}

  return (
    <section>
      <div className="add-memory-page">
        <h2>Crie uma nova memória</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            <p>Titúlo</p>
            <input
              type="text"
              placeholder="Defina um título"
              name="title"
              id="title"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <p>Descrição:</p>
            <textarea
              id="description"
              placeholder="Explique sobre seu tópico... (Ex: Novas atualizações, personagens, builds e etc.)"
              onChange={handleChange}
              name="description"
            ></textarea>
          </label>
          <label>
            <p>Foto:</p>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
            />
          </label>
          <input type="submit" className="btn" value="Enviar" />
        </form>
      </div>
    </section>
  );
};

export default AddMemory;
