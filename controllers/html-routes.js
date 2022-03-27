const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");
const htmlRoutes = require("./html-routes");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET - "/login" - Login form
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
// GET - "/signup" - REgistration form
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("register");
});


router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll ({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get ({plain: true}));
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/new", withAuth, async (req, res) => {
  res.render("create-post");
});


router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,  {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = postData.get({plain: true});
    const comments = commentData.map((comment) => comment.get({plain: true}));

    res.render("post", {
      post,
      comments,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
    router.get("/post/:id", async (req, res) => {
      try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        });
    
        const post = postData.get({ plain: true });
    
        res.render("post", {
          ...posts,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
try{
  const postData = await Post.findByPk(req.params.id);
  const post = postData.get({plain: true});

  res.render("edit-post", {
    ...post,
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
