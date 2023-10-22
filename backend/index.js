const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;

// middleware for request.body to work //
app.use(cors());
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
