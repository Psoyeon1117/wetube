import express from "express";
import { watch, getEdit,postEdit, remove, upload} from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/remove", remove);


export default videoRouter;