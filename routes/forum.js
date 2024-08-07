import { Router } from "express";
import { getPost } from "../controllers/forum.js";

const forumRouter = Router();

forumRouter.get('/posts', getPost)





export default forumRouter