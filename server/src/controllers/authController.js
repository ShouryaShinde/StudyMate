import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getGoogleClient = () => {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
};

const googleLogin = (req, res) => {
  const googleClient = getGoogleClient();

  const authUrl = googleClient.generateAuthUrl({
    access_type: "offline",

    scope: [
      "openid",
      "profile",
      "email",
    ],

    prompt: "select_account",

    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
  });

  res.redirect(authUrl);
};

const googleCallback = async (req, res) => {
  try {

    const { code, error, error_description } = req.query;

    if (error) {
      return res.status(400).json({
        message: "Google OAuth error",
        error,
        error_description,
      });
    }

    if (!code) {
      return res.status(400).json({
        message: "Authorization code missing",
        details: req.query,
      });
    }

    const googleClient = getGoogleClient();

    console.log("Authorization code received");

    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    });

    console.log("Google tokens received");

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        avatar: picture,
      });
    } else {
      console.log("Existing user found");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/auth/success?token=${token}`
    );

  } catch (error) {
    console.error("Google authentication error:", error);

    res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

export {
  googleLogin,
  googleCallback,
};