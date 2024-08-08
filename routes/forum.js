import { Router } from "express";
import { createPost, deletePost, editPost, getCatPost, getPost, getPosts } from "../controllers/forum.js";
import { isAuthenticated } from "../middlewares/auth.js";

const forumRouter = Router();

forumRouter.get('/posts', isAuthenticated, getPosts)
forumRouter.get('/posts/:id', isAuthenticated, getPost)
forumRouter.get('/categories/:category', isAuthenticated, getCatPost)
forumRouter.post('/posts', isAuthenticated, createPost)
forumRouter.patch('/posts/:id', isAuthenticated, editPost)
forumRouter.delete('/posts/:id', isAuthenticated, deletePost)





export default forumRouter