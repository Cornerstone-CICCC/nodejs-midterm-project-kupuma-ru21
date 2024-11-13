import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";

const restaurantRouter = Router();

// REF: https://expressjs.com/en/guide/using-middleware.html > Router-level middleware
restaurantRouter.use((req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(401).send({ error: "Authorization header is required" });
    return;
  }
});

restaurantRouter.post("/add", restaurantController.addRestaurant);
restaurantRouter.post("/", restaurantController.getRestaurants);

export default restaurantRouter;
