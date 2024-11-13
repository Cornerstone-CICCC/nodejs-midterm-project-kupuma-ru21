import { v4 as uuidv4 } from "uuid";
import { Restaurant } from "../types/restaurant";

class RestaurantModel {
  private restaurants: Restaurant[] = [];

  createRestaurant(newRestaurant: Omit<Restaurant, "id">): Restaurant {
    const restaurant = {
      id: uuidv4(),
      ...newRestaurant,
    };
    this.restaurants.push(restaurant);
    return restaurant;
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  editRestaurant(restaurantEdited: Restaurant): void {
    const restaurants = this.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantEdited.id) return { ...restaurantEdited };
      return restaurant;
    });
    this.restaurants = restaurants;
  }

  deleteRestaurant(id: string): void {
    this.restaurants = this.restaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });
  }
}

export default new RestaurantModel();
