const express = require("express");
const posts = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: "Can't get posts" });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  console.log("Posts.Get/ID", req.params);
  //   posts
  //     .getById(req.params.id)
  //     .then((posts) => {
  //       res.status(200).json(posts);
  //     })
  //     .catch((error) => {
  //       res.status(400).json({ message: "Can't get user's posts" });
  //     });
});

router.delete("/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((post) => {
      res.status(200).json({ message: "NUKED post" });
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", (req, res) => {
  // text
  posts
    .update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(400).json({ message: `Post ${req.params.id} NOT found` });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

module.exports = router;
