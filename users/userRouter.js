const express = require("express");
// add the user database
const users = require("./userDb");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Router.Get", req.body);
  users
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      //   res.status(500).json({ message: "ERROR getting users" });
      next(error);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  console.log("Router.Get/id", req.params.id);
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      //   res.status(500).json({ message: "ERRor cant get posts" });
      next(error);
    });
});

router.post("/", validateUser(), (req, res) => {
  console.log("Router.Post", req.body);
  users
    .insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "ERROR adding user" });
    });
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  console.log("User/id/posts", req.body);
});

router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: "User NUKED",
      });
    })
    .catch((error) => {
      console.log("Delete/id", error);
      //   res.status(500).json({ message: "Error removing User" });
      next(error);
    });
});

router.put("/:id", validateUser(), validateUserId(), (req, res) => {
  users
    // name
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

//custom middleware
// validate the body ona request to create a new user
function validateUser() {
  return (req, res, next) => {
    // if body is missing, cancel the request
    // if body is missing require name field, cnacel request
    console.log("Body", req.body);
    console.log("Body Name", req.body.name);
    if (!req.body) {
      return res.status(400).json({
        message: "MISSING user data",
      });
    }
    if (!req.body.name) {
      return res.status(400).json({ message: "MISSING required name field" });
    }
    // next must be called on the outside so that it is not called when data is missing
    next();
  };
}

//validates the user id on every request tha texpects a user id parameter
function validateUserId() {
  // if the id parameter is valid, store user obj as req.user
  // if the id param does NOT match, cancel the request with 400
  return (req, res, next) => {
    // console.log(req.params.id);
    users
      .getById(req.params.id)
      .then((user) => {
        console.log(user);
        if (user) {
          // make the user obj available to later middleware function
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "User NOT found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Can't get user" });
      });
  };
}

function validatePost() {
  // if body is missing, cancel request
  // if body.text is missing, cancel request
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "MISSING post data" });
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "MISSING text field" });
    }
    next(error);
  };
}

module.exports = router;
