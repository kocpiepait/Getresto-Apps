import CONFIG from '../../globals/config';

const detailTemplate = (resto) => `
<div class="container-detail">
  <div class="container-label">
    <div class="content-label">
      <h1>${resto.name}</h1>
      <p>${resto.address}, ${resto.city}</p>
      <div class="content-label-icon">
        <div class="rating">
          <p class="start">⭐${resto.rating}<p>
          <p>Ratings</p>
        </div>
        <div id="likeButtonContainer">
        </div>
      </div>
    </div>

    <div class="img-container">
    <img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt=$"{resto.name}" />
  </div>
  </div>
  
</div>

<div class="container-detail-desc">
  <div class="content-desc">
    <p>${resto.description}</p>
  </div>
</div>

<div class="detail-menu">
    <h2>🍴 Menu 🍴</h2>
      <div class="detail-food">
        <h3>Foods</h3>
        <div class ="foods">
        ${resto.menus.foods
    .map(
      (food) => `
            <div class="foods-card">
                <p>🍕${food.name}</p>
                <button type"submit">ADD</button>
            </div>    
              `,
    )

    .join('')}
        </div>
      </div>

      <div class="detail-drink">
        <h3>Drinks</h3>
        <div class ="drinks">
        ${resto.menus.drinks
    .map(
      (drink) => `
            <div class="drinks-card">
                <p>🍹${drink.name}</p>
                <button type"submit">ADD</button>
            </div>    
              `,
    )
    .join('')}
        </div>
      </div>
  </div>

  <div class="detail-review">
    <h2>Review</h2>
    <h3>What People Say</h3>
    ${resto.customerReviews
    .map(
      (review) => `
          <div class="detail-review-container">
            <div class="review-info">
              <p class="review-name">${review.name}</p>
              <p class="review-date">Review on ${review.date}</p>
            </div>

            <div class="review-body">
              <p>${review.review}</p>
            </div>
          </div>
        `,
    )
    .join('')}
    </div>
</div>    
`;

export default detailTemplate;
