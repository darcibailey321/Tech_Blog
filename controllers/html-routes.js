const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");
const htmlRoutes = require("./html-routes");

// GET - "/" - home
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---

// GET - "/login" - Login form
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

// POST - "/api/users/login" - Authenticate existing user
router.get('/posts/:id', async (req, res) => {
    try {
      const postData = await Posts.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile', )
// ---

// GET - "/signup" - REgistration form

// POST - "/api/users/" - Create User

// ---

// GET - "/dashboard" - User Dashboard

// ---

// GET - "/dashboard/new" - Create Post View

// POST - "/api/posts - Create Post API

// ---
// GET - "/dashboard/edit/:postId" - Edit Post View (javascript)

// PUT - "/api/posts/:postId" - Edit Post API

// DELETE  - "/api/posts/:postID" - Delete post API

// ---

// GET - "/post/:postId" - View a single Post

// POST - "/api/comments" - Create a comment for a post

module.exports = router;

// router.get('/', async (req, res) => {
//     try {
//       // Get all projects and JOIN with user data
//       const projectData = await Project.findAll({
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//         ],
//       });
  
//       // Serialize data so the template can read it
//       const projects = projectData.map((project) => project.get({ plain: true }));
  
//       // Pass serialized data and session flag into template
//       res.render('homepage', { 
//         projects, 
//         logged_in: req.session.logged_in 
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/project/:id', async (req, res) => {
//     try {
//       const projectData = await Project.findByPk(req.params.id, {
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//         ],
//       });
  
//       const project = projectData.get({ plain: true });
  
//       res.render('project', {
//         ...project,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   // Use withAuth middleware to prevent access to route
//   router.get('/profile', withAuth, async (req, res) => {
//     try {
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Project }],
//       });
  
//       const user = userData.get({ plain: true });
  
//       res.render('profile', {
//         ...user,
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/login', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//       res.redirect('/profile');
//       return;
//     }
  
//     res.render('login');
//   });
  
//   module.exports = router;
  
