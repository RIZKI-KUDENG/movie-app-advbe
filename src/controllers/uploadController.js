export const uploadSingle = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "file not found" });
    }
    res.status(201).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
