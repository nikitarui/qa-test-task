class AuthService {

    static get $inject () { return ['$http', '$location'] }

    constructor ($http, $location) {
        this.$http = $http
        this.$location = $location
    }

    login (username, password) {
        return this.$http
            .post('/login', {username, password})
            .then(response => {
                const user = response.data

                sessionStorage.setItem('id', user.id)
                sessionStorage.setItem('username', user.username)

                return Promise.resolve(user)
            })
            .catch(error => Promise.reject(error))
    }

    logout () {
        return this.$http.get('/logout')
            .then(response => {
                sessionStorage.setItem('id', '');
                sessionStorage.setItem('username', '');
                this.$location.path('/login');

                return Promise.resolve()
            })
            .catch(error => Promise.reject(error))
    }

    get isAuthenticated () {
        const user = this.user;

        return !!user.id && !!user.username
    }

    get user () {
        const id = sessionStorage.getItem('id')
        const username = sessionStorage.getItem('username')

        return {id, username}
    }
}

angular
    .module('app')
    .service('AuthService', AuthService)
