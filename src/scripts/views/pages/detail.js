import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/restoSource';
import detailTemplate from '../tamplates/restoDetail';
import LikeButtonInitiator from '../../utils/like-button-iniator';

const Detail = {
  async render() {
    return `
    <div class"container">
      <div class="heading-page">
        <h1>Detail Page</h1>
      </div>
      <div class="content-wrap">
        <div class="detail-page" id="detail"></div>
      </div>
    </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const data = await DataSource.detailResto(url.id);
    const detailContainer = document.querySelector('#detail');
    // const likeButtonContainer = document.querySelector('#likeButtonContainer');

    // get detail data
    detailContainer.innerHTML = detailTemplate(data.restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: data.restaurant.id,
        name: data.restaurant.name,
        city: data.restaurant.city,
        pictureId: data.restaurant.pictureId,
        description: data.restaurant.description,
        rating: data.restaurant.rating,
      },
    });
  },
};

export default Detail;
