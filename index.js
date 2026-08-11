import express from "express";

const app = express();

app.get("/", (req, res) => {
  // trả về một html đơn giản
    res.send("<a></a>");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
