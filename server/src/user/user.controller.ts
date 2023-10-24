import axios from "axios";
import { User } from "../shared/database/index";
import { CREATED } from "http-status";
import { auth } from "express-oauth2-jwt-bearer";

const login = async (req: any, res: any) => {
  console.log("IN LOGIN API SERVER SIDE");
  const authServer = "https://js53110.eu.auth0.com";

  /*async () => {
    auth({
      audience: "https://js53110.com", // Audience should match your Auth0 API
      issuerBaseURL: "https://js53110.eu.auth0.com",
      tokenSigningAlg: "RS256",
    });
  };*/

  const accessToken = req.auth!.token;
  try {
    const userInfoResponse = await axios.post(
      `${authServer}/userinfo`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = userInfoResponse.data.nickname;

    const existingUser = await User.findOne({ where: { username: user } });

    if (existingUser) {
      console.log("User already exists");
      console.log(existingUser.dataValues);
      res.json(existingUser.dataValues);
    } else {
      // Create a new user without specifying the 'id'
      const newUser = await User.create({ username: user });
      console.log("User created with ID:", newUser.id);
      res.status(CREATED).json(newUser);
    }
  } catch (err) {
    console.log(err);
  }
};

export { login };
