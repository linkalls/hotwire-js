import express from "express"
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/hotwire-demo", {})

const userSchema = mongoose.Schema({
  name: String,
})

const User = mongoose.model("User", userSchema)

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/users", async (req, res) => {
  console.log(req.query.name)
  const users = await User.find({ name: new RegExp(req.query.name, "i") })
  res.render("users", { users })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
