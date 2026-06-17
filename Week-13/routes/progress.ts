
import { Router } from "express";
import { getCourseProgress } from "../controllers/progressController";

const router = Router()

router.get("/progress", getCourseProgress)

export default router
