import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import brandRouter from "./routes/brandRoutes.js";
import nodemailer from "nodemailer";

dotenv.config();
// "mongodb+srv://novateammypetshop:PNe5EGUIt2OHALOH@cluster0.n4sbjz1.mongodb.net/mern-amazona-app-db"
//process.env.MONGODB_URI
mongoose
.connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/brands", brandRouter);

app.post('/api/send-email', async (req, res) => {
  let { to, subject, html } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supp.nova.petshop@gmail.com',
      pass: 'mnrx iqes pvxs vbpr'
    },
  });

  let mailOptions = {
    from: 'supp.nova.petshop@gmail.com',
    to,
    subject,
    html
  };

  let info = await transporter.sendMail(mailOptions);

  res.send(info);
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5400;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});