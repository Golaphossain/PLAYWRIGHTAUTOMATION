exports.LoginPage =
    class LoginPage {
        constructor(page) {
            this.page = page
            this.username = page.locator("#userEmail")
            this.password = page.locator("#userPassword")
            this.loginbutton = page.locator("[value='Login']")
        }
        async validLogin(username,password) {
            await this.username.fill(username)
            await this.password.fill(password)
            await this.loginbutton.click()
            await this.page.waitForLoadState('networkidle')
        }
        async goTo(){
            await this.page.goto("https://rahulshettyacademy.com/client")
        }
    }