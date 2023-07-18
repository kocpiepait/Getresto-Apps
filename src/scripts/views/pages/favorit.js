/* eslint-disable eqeqeq */
import FavoriteRestaurant from '../../data/favorit-resto-idb';
import restoCard from '../tamplates/card';

const Favorit = {
  async render() {
    return `
    <div class="container">
      <div class="heading-page">
        <h1>Your Favorited Restaurant</h1>
      </div>
      <h2 class="restaurant-item__not__found"></h2>
      <div id="favResto" class="resto-list">
 
      </div>
    </div>
      `;
  },

  async afterRender() {
    const data = await FavoriteRestaurant.getAllResto();
    const favRestoContainer = document.querySelector('#favResto');
    const empty = document.querySelector('.restaurant-item__not__found');
    if (data == 0) {
      empty.innerHTML = `
        Anda belum mempunyai daftar Restaurant Favorite, silahkan tambahkan dengan cara click icon hati pada halaman detail.
      `;
    }

    data.forEach((resto) => {
      favRestoContainer.innerHTML += restoCard(resto);
    });
  },
};

export default Favorit;
