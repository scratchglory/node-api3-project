const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "This is the Welcome Page!",
  });
});

module.exports = router;
