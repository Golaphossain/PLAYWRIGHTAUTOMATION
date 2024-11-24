exports.ApiUtils =
class ApiUtils {
    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayload})
        // expect(loginResponse.ok()).toBeTruthy()
        const  jsonloginResponse = await loginResponse.json()
        const token = jsonloginResponse.token
        return token
    }
    async createOrder(orderPayload){
        let response = {}
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers:{
               'Authorization': response.token,
               'Content-Type': 'application/json'
            },
         })
         const jsonOrderResponse = await orderResponse.json();
         const orderId = jsonOrderResponse.orders[0];
         response.orderId = orderId
         return response
    }
}