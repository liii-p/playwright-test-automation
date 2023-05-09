class ApiUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad,
      }
    );
    const loginResponseJson = JSON.parse(await loginResponse.text());
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJson = JSON.parse(await orderResponse.text());

    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { ApiUtils };
