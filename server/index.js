import express from "express"
import cors from "cors"
import fs from "fs"

const trains = JSON.parse(
  fs.readFileSync("./data/trains.json", "utf-8")
)

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

app.get("/trains", (req, res) => {
  const { search } = req.query

  let result = trains

  if (search) {
    const q = search
      .toString()
      .replace(/"/g, "")
      .trim()
      .toLowerCase()

    result = trains.filter(train =>
      train.trainNumber.toLowerCase().includes(q) ||
      train.fromCity.toLowerCase().includes(q) ||
      train.toCity.toLowerCase().includes(q)
    )
  }

  res.json(result)
})

app.get("/trains/:id", (req, res) => {
  const train = trains.find(t => t.id === req.params.id)

  if (!train) {
    return res.status(404).json({ message: "Train not found" })
  }

  res.json(train)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})