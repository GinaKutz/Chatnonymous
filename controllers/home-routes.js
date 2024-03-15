const router = require('express').Router();
const { Gallery, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// Display login or chat page
router.get('/', withAuth, async (req, res) => {

  res.render('chat_window', {
    loggedIn: req.session.loggedIn,
  });

});

module.exports = router;
