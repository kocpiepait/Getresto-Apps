import CONFIG from '../../globals/config';

const restoCard = (resto) => `
    <div tabindex="0" class="card" id="card">
        <section>
          <div class="label">
            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${
  resto.name
}"/>
            <h1>${resto.city}</h1>
            <figcaption><p>Rating:${resto.rating}<p></figcaption>
          </div>
          <div class="desc">
            <h2 id ="name"><a href="/#/detail/${resto.id}">${resto.name}</a></h2>
            <p>${resto.description}</p>
          </div>
        </section>
     </div>
    `;

export default restoCard;
