const Post = require('../models/post.js');
const Comment = require('../models/comments.js');


module.exports = (app) => {
  app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF COMMENTS MODEL
    const comment = new Comment(req.body);
    // SAVE INSTANCE OF COMMENTS MODEL TO DB
    comment
      .save()
      .then(comment => {
        // REDIRECT TO ROOT
        return Post.findById(req.params.postId);
      })
      .then(post => {
        // New comments come first on reddit!!
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });
};