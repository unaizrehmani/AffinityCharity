const Post = require('../models/post');
const Profile = require('../models/profile');
const Agent = require('../models/agent');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/posts`;

/*
 * POST /api/posts route to create a new post.
 *
 * REQ.BODY:
 * @param {string} description
 *
 * REQ.FILES
 * @param {file} image
 */
exports.insertPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    post.createdDate = new Date();

    if (req.files.image && req.files.image.path) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        },
        (err, imageInfo) => {
          if (err) res.send(err);
          post.mediaURL = imageInfo.url;
          post.mediaID = imageInfo.public_id;
        }
      );
    }
    const result = await post.save();

    // update relevant Profiles
    for (let i = 0; i < post.tagged.length; i++) {
      const profileID = post.tagged[i];
      await Profile.findByIdAndUpdate(
        profileID,
        { $push: { taggedPosts: result._id } },
        { safe: true, upsert: true, new: true }
      );
    }

    // update relevant Agent
    await Agent.findByIdAndUpdate(
      result.author,
      { $push: { posts: result._id } },
      { safe: true, upsert: true, new: true }
    );

    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * GET /api/posts/:postID route to get a post by ID.
 *
 * REQ.PARAMS
 * @param {number} postID
 */
exports.getPostByID = async (req, res, next) => {
  try {
    const id = req.params.postID;
    const post = await Post.findById(id)
      .populate('tagged')
      .populate('author');
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/posts route to get all posts.
 */
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate('tagged')
      .populate('author');
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

/*
 * PATCH /api/posts route to patch a post by ID.
 *
 * REQ.PARAMS:
 * @param {number} postID
 *
 * REQ.BODY:
 * @param {string} description
 *
 * REQ.FILES
 * @param {file} image
 */
exports.patchPostByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    if (req.files && req.files.image && req.files.image.path) {
      const post = await Post.findById(req.params.postID);
      if (post.mediaID) {
        await cloudinaryUtil.v2.uploader.destroy(
          post.mediaID,
          (error, result) => {
            if (error) res.send(error);
          }
        );
      }
      const uploadResult = await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        }
      );
      body.mediaID = uploadResult.public_id;
      body.mediaURL = uploadResult.url;
    }
    const result = await Post.findByIdAndUpdate(req.params.postID, body, {
      new: true
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * DELETE /api/posts/:postID route to delete a post by ID.
 *
 * REQ.PARAMS:
 * @param {number} postID
 */
exports.deletePostByID = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postID);
    if (post.mediaID) {
      await cloudinaryUtil.v2.uploader.destroy(
        post.mediaID,
        (error, result) => {
          if (error) console.log('Failed to delete post: ', post.mediaID);
        }
      );
    }
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};
