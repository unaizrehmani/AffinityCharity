const Post = require('../models/post');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const cloudinaryPath = process.env.CLOUDINARY_PATH;

// POST routes
exports.insertPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    post.createdDate = new Date();
    post.profileArray = [];
    await cloudinaryUtil.v2.uploader.upload(
      req.files.image.path, {
        folder: `${cloudinaryPath}/posts`
      },
      (err, imageInfo) => {
        if (err) res.send(err);
        post.mediaURL = imageInfo.url;
        post.mediaID = imageInfo.public_id;
      }
    );
    const result = await post.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// GET routes
exports.getPostByID = async (req, res, next) => {
  try {
    let id = req.params.postID;
    const post = await Post.findById(id);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

// PATCH routes
exports.patchPostByID = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(req.params.postID, req.body, {
      new: true
    });
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

// DELETE routes
exports.deletePostByID = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postID);
    await cloudinaryUtil.v2.uploader.destroy(post.mediaID, (error, result) => {
      if (error) console.log('Failed to delete post: ', post.mediaID);
    });
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};