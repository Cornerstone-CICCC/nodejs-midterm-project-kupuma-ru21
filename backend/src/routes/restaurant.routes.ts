import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";
import { HMAC_SHA256 } from "../utils/jwt";

const restaurantRouter = Router();

// REF: https://expressjs.com/en/guide/using-middleware.html > Router-level middleware
restaurantRouter.use((req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (jwtSecret === "") {
    res.status(404).send({ token: "", error: "jwtSecret not found" });
    return;
  }

  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(401).send({ error: "Authorization header is required" });
    return;
  }

  const bearer = authorization.replace("Bearer", "").trim();
  if (bearer === "") {
    res.status(401).send({ error: "token not found" });
    return;
  }

  const token = bearer.replace("token=", "").trim();
  const splits = token.split(".");
  const unsignedToken = [splits[0], splits[1]].join(".");

  if (HMAC_SHA256(jwtSecret, unsignedToken) !== splits[2]) {
    res.status(401).send({ error: "Invalid token" });
    return;
  }

  next();
});

restaurantRouter.post("/add", restaurantController.addRestaurant);
restaurantRouter.post("/", restaurantController.getRestaurants);

export default restaurantRouter;
