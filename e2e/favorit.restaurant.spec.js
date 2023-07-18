/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('favorit.restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorit');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#favResto');
  I.see(
    'Anda belum mempunyai daftar Restaurant Favorite, silahkan tambahkan dengan cara click icon hati pada halaman detail.',
    '.restaurant-item__not__found',
  );
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    'Anda belum mempunyai daftar Restaurant Favorite, silahkan tambahkan dengan cara click icon hati pada halaman detail.',
    '.restaurant-item__not__found',
  );

  I.amOnPage('/');

  I.waitForElement('#name', 10);
  I.seeElement('#name');

  const firstRestaurant = locate('#name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorit');
  I.waitForElement('.card', 10);
  I.seeElement('.card');

  const likedRestaurantName = await I.grabTextFrom('#name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement('#name');
});

Scenario('unlike one restaurants', async ({ I }) => {
  I.see(
    'Anda belum mempunyai daftar Restaurant Favorite, silahkan tambahkan dengan cara click icon hati pada halaman detail.',
    '.restaurant-item__not__found',
  );

  I.amOnPage('/');

  I.waitForElement('#name', 10);
  I.seeElement('#name');

  const firstRestaurant = locate('#name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorit');
  I.waitForElement('.card', 10);
  I.seeElement('.card');

  const likedRestaurantName = await I.grabTextFrom('#name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement('#name');

  const firstRestaurantLiked = locate('#name').first();
  I.click(firstRestaurantLiked);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see(
    'Anda belum mempunyai daftar Restaurant Favorite, silahkan tambahkan dengan cara click icon hati pada halaman detail.',
    '.restaurant-item__not__found',
  );
});
