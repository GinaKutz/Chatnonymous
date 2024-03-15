const router = require('express').Router();
const { Gallery, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// Display login or chat page
// router.get('/', withAuth, async (req, res) => {
//   res.render('index', {
//     loggedIn: req.session.loggedIn,
//   });
// });

// homepage without login auth so I can test things
router.get('/', async (req, res) => {
    res.render('index', {
      loggedIn: req.session.loggedIn,
    });
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
module.exports = router;
