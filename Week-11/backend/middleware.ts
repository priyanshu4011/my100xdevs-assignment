import type { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const VerifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(403).json("Access denied")
  }
  try {
    const decoded = jwt.verify(token, "secret") as { id: string }

    req.userId = decoded.id
    next()
  } catch (error) {
    console.log("inavlid token", error)

  }
}
