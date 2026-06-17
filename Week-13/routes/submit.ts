import { Router } from "express";
import { submitProblem } from "../controllers/submitController";

const router = Router()

router.post("/submit", submitProblem)

export default router
