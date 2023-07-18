import DataSource from '../../data/restoSource';
import restoCard from '../tamplates/card';

const home = {
  async render() {
    return `
    
    <div class="search">
    <div class="search-wrapp">
      <h1>Explore Restaurant</h1>
      <form>
        <input type="search" id="cari" class="input" placeholder="Cari Restoran....">
        <button type="submit" id="submit" class="btn-cari">Search</button>
      </form>
    </div>
    </div>

    <div class="container" id="resto">
      <h1 class="conten_heading">Restaurant List</h1>
      <div class="resto-list" id="content"></div>
    </div>
     
      `;
  },

  async afterRender() {
    const data = await DataSource.getRestaurantList();
    const restoContainer = document.querySelector('#content');
    data.restaurants.forEach((restaurant) => {
      restoContainer.innerHTML += restoCard(restaurant);
    });
  },
};

export default home;
