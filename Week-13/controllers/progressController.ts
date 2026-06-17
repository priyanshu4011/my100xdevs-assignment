
import type { Request, Response } from "express";
import { pool } from "../config/db";

export const getCourseProgress = async (req: Request, res: Response) => {
  const { user_id } = req.query

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" })
  }

  try {
    const result = await pool.query(
      `SELECT c.title as course, p.completion_percentage
       FROM progress p
       JOIN courses c ON p.course_id = c.id
       WHERE p.user_id = $1`,
      [user_id]
    )

    res.status(200).json(result.rows)

  } catch (error) {
    res.status(500).json({ message: "failed to fetch progress", error })
  }
}
