class LoginController {

    static get $inject () { return ['AuthService', '$location'] }

    constructor(AuthService, $location) {
        this.AuthService = AuthService
        this.$location = $location
        this.success = true
    }

    login () {
        this.AuthService
            .login(this.username, this.password)
            .then(data => {
                this.$location.path('/');

                this.success = true;
            })
            .catch(error => {
                this.success = false
            })
    }
}

angular
  .module('app')
  .controller('LoginController', LoginController)
