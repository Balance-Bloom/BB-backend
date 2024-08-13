import { Router } from "express";
import { commentPost, createPost, deletePost, editPost, getCatPost, getPost, getPosts, getSubCatPost, likePost } from "../controllers/forum.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";


const forumRouter = Router();

forumRouter.get('/posts', isAuthenticated, getPosts)
forumRouter.get('/posts/:id', isAuthenticated, getPost)
forumRouter.get('/categories/:category', isAuthenticated, getCatPost)
forumRouter.get('/categories/:category/:subCategory', isAuthenticated, getSubCatPost)

forumRouter.post('/posts',remoteUpload.single('image'), isAuthenticated, createPost)
forumRouter.post('/posts/like/:postId', isAuthenticated, likePost)
forumRouter.post('/posts/comment/:postId', isAuthenticated, commentPost)

forumRouter.patch('/posts/:id',remoteUpload.single('image'), isAuthenticated, editPost)
forumRouter.delete('/posts/:id', isAuthenticated, deletePost)

export default forumRouter