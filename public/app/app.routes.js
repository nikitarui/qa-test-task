angular.module('app.routes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

function AppRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider
      .html5Mode(true);

    $urlRouterProvider
      .otherwise('/404');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/app/layout/main/main.view.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/app/layout/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('404', {
        url: '/404',
        template: 'Страница не найдена!'
      })

}
