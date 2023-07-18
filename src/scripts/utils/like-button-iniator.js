import FavoriteRestaurant from '../data/favorit-resto-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/tamplates/like-button';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = data;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    const restaurant = await FavoriteRestaurant.getResto(id);

    if (restaurant) {
      this._renderLikedButton();
    } else {
      this._renderLikeButton();
    }
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick fav the selected resto
      await FavoriteRestaurant.putResto(this._restaurant);
      this._renderButton();
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick unfav the selected resto
      await FavoriteRestaurant.deleteResto(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
