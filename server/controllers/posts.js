const Post = require("../models/post");
const cloudinaryUtil = require("../util/cloudinary");

//POST routes
exports.insertPost = (req, res, next) => {
  cloudinaryUtil.v2.uploader.upload(
    req.files.image.path,
    { folder: "posts" },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        new Post({
          mediaURL: result.url,
          description: req.body.description,
          createdDate: new Date(),
          profileArray: [],
          mediaID: result.public_id
        })
          .save()
          .then(result => {
            res.send(result);
          })
          .catch(err => {
            res.send(err);
          });
      }
    }
  );
};

//GET routes
exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .then(result => res.send(result))
    .catch(err => res.send(err));
};

//PATCH routes
exports.patchPostByID = (req, res, next) => {
  Post.findOneAndUpdate(req.params.postID, req.body, { new: true })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

//DELETE routes
exports.deletePostByID = (req, res, next) => {
  Post.findByIdAndDelete(req.params.postID)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
