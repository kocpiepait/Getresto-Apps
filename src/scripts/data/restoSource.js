import API_ENDPOINT from '../globals/api-endpoint';

class DataSource {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    return response.json();
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async searchResto(keyword) {
    const response = await fetch(API_ENDPOINT.SEARCH(keyword));
    return response.json();
  }
}

export default DataSource;
