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
