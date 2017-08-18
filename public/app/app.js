angular
  .module('app', ['app.routes'])
  .run(AuthInterceptor);

AuthInterceptor.$inject = ['$location', 'AuthService'];

function AuthInterceptor ($location, AuthInterceptor) {

    const isAuthenticated = AuthInterceptor.isAuthenticated;

    if(!isAuthenticated && $location.path() !== '/login') {
        $location.path('/login')
    }

}
