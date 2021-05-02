const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
  // GET POSTS-INDEX
  app.get('/', (req, res) => {
    var currentUser = req.user;
    // res.render('home', {});
    console.log(req.cookies);
    Post.find({}).lean().populate('author')
      .then(posts => {
        res.render('posts-index', { posts, currentUser });
        // res.render('home', {});
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    if (req.user) {
      var post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          res.redirect(`/posts/${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      // UNAUTHORIZED
      return res.status(401);
    }
  });

  app.get('/posts/:id', (req, res) => {
    var currentUser = req.user;
    // LOOK UP THE POST
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
        res.render('posts-show', { post , currentUser });
    })
    .catch(err => {
        console.log(err.message);
    });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", (req, res) => {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });

};