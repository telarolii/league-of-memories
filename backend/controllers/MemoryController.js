const Memory = require("../models/Memory");

const path = require("path");

const fs = require("fs").promises;

const removeOldImage = async (memory) => {
  try {
    const filePath = path.join(__dirname, "..", "public", memory.src);
    await fs.unlink(filePath);
    console.log("Imagem excluída com sucesso");
  } catch (err) {
    console.log("Erro ao excluir imagem:", err.message);
  }
};

// POST

const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = `images/${req.file.filename}`;

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos" });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });

    await newMemory.save();

    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

// GET

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();

    res.json(memories);
  } catch (error) {
    res.status(500).send("Ocorreu  um erro!");
  }
};

// GET - ID

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).josn({ msg: "Memória não encontrada" });
    }

    res.json(memory);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

// DELETE

const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada" });
    }

    await removeOldImage(memory);

    res.json({ msg: "Memória excluída" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

// PATCH

const updateMemory = async (req, res) => {
  try {
    const { title, description } = req.body;

    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    if (src) {
      await removeOldImage(memory);
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (src) updateData.src = src;

    const updateMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ updateMemory, msg: "Memória atualizada" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

// Favorite

const toggleFavorite = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada" });
    }

    memory.favorite = !memory.favorite;

    await memory.save();
    res.json({ msg: "Memória favoritada", memory });
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

// ADD - COMMENTS

const addComment = async (req, res) => {
  try {
    const {name, text} = req.body

    if(!name || !text) {
      return res.status(400).json({msg: "Por favor, preencha todos os campos."})
    }

    const comment = { name, text};
    
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada" });
    }

    memory.comments.push(comment)

    await memory.save();
    res.json({ msg: "Comentário adicionado!", memory });
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
}


module.exports = {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
  updateMemory,
  toggleFavorite,
  addComment,
};
