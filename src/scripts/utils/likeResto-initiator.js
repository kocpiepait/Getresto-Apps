import LikeButtonInitiator from './like-button-iniator';
import FavoriteRestaurant from '../data/favorit-resto-idb';

const createLikeButtonInitWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestaurant,
    restaurant: restaurant.id,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonInitWithRestaurant };
