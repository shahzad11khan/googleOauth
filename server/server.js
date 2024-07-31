const express = require("express");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

const app = express();
const client = new OAuth2Client(
  "817961121235-i0cr46ngedeifrm9f23vaul8pt2jlspq.apps.googleusercontent.com"
);

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  console.log(token);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      //   audience:
      //     "817961121235-i0cr46ngedeifrm9f23vaul8pt2jlspq.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
