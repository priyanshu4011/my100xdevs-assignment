import express from "express"

const app = express()


app.use(express.json())

import submitRoute from "./routes/submit.ts"
import progressRoute from "./routes/progress.ts"

app.use("/api/v1", submitRoute)
app.use("/api/v1", progressRoute)

app.listen(3000, () => console.log("server running at port 3000 ..."))
