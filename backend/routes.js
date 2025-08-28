const express = require("express");

const router = express.Router();

const upload = require("./helpers/upload");

const {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
  updateMemory,
  toggleFavorite,
  addComment,
} = require("./controllers/MemoryController");

// POST

router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ msg: "Por favor, envie um arquivo." });
    }

    next();
  },
  (req, res) => createMemory(req, res)
);

// GET

router.get("/", (req, res) => getMemories(req, res));

// GET - ID

router.get("/:id", (req, res) => getMemory(req, res));

// DELETE

router.delete("/:id", (req, res) => deleteMemory(req, res));

// PATCH

router.patch("/:id", upload.single("image"), (req, res) =>
  updateMemory(req, res)
);

// FAVORITE

router.patch("/favorite/:id", (req, res) => toggleFavorite(req, res));

// ADD COMMENT

router.patch("/:id/comment", (req, res) => addComment(req, res));

module.exports = router;
