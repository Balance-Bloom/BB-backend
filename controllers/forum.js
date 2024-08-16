import { ForumModel } from "../models/forum.js";

export const getPosts = async (req, res, next) => {
    try {
        const posts = await ForumModel.find().sort({ updatedAt: -1 })
        res.status(200).json(posts)

        // pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const skip = (page - 1) * limit;
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res, next) => {
    try {
        const { title, category, content, subCategory, author } = req.body;
        if (!title || !category || !content) {
            return next("Please enter all the required fields and choose image", 422)
        }
        const { image } = req.file.filename;
        //if (image.size > 2000000) {
        //return next("Thumbnail too big File should be less than 2mb")}
        
        const post = await ForumModel.create({
            title,
            category,
            content,
            subCategory,
            image: req.file.filename,
            author
        })
        res.status(200).json({
            sucess: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res, next) => {
    try {
        const postId = req.param.id;
        const post = await ForumModel.findById(postId)
        if (!post) {
            return next("Post not found")
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCatPost = async (req, res, next) => {
    try {
        const { category } = req.param;
        const catPosts = await ForumModel.find({ category }).sort({ publishedAt: -1 })
        res.status(200).json(catPosts)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getSubCatPost = async (req, res, next) => {
    try {
        const { category, subCategory } = req.param;
        const subCat = await ForumModel.find({ category, subCategory }).sort({ publishedAt: -1 })
        res.status(200).json(subCat)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const editPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const post = await ForumModel.findByIdAndUpdate(id, { status }, { new: true });

        res.status(200).json({
            sucess: true,
            message: "Action performed successfully",
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        await ForumModel.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const likePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await ForumModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.likes += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error liking post:Internal Server Error' });
    }
}

export const commentPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const { text } = req.body;
        const post = await ForumModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.comments.push({ text });
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment:Internal Server Error' });
    }
}