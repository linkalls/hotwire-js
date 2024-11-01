import csv from "csv-parser"
import mongoose from "mongoose"
import fs from "fs"

mongoose.connect("mongodb://localhost:27017/hotwire-demo", {})

const userSchema = mongoose.Schema({
  name: String,
})

const User = mongoose.model("User", userSchema)

// CSVファイルを読み込み、データを保存する関数
const seedDatabase = async () => {
  const results = []
  fs.createReadStream("dummy.csv")
    .pipe(csv({ headers: ["name"], skipLines: 1 }))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const row of results) {
        const user = new User({ name: row.name })
        await user.save()
      }
      console.log("Database seeded successfully")
      mongoose.connection.close()
    })
}

seedDatabase()