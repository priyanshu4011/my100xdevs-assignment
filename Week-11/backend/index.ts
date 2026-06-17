import express from "express"
import mongoose from "mongoose"

const app = express()

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/assignment")
}

app.use(express.json())

import userRouter from "./routes/user.ts"
import accountRouter from "./routes/account.ts"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account", accountRouter)

connectDB().then(() => {
  app.listen(3000, () => console.log("server started at port 3000..."))
})
