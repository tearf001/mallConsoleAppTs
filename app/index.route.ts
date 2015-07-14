module mallConsoleApp {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'homeController',
          controllerAs: 'home'
        })
        .state('public-set', {
          url: '/public-set',
          templateUrl: 'app/public-set/public-set.html',
          controller: 'publicSetController',
          //controllerAs: 'vm'
        })
        .state('orders', {
          url: '/orders',
          templateUrl: 'app/orders/orders.html',
          controller: 'ordersController',
          //controllerAs: 'vm'
        })
        .state('comments', {
          url: '/comments',
          templateUrl: 'app/comments/comments.html',
          controller: 'commentsController',
          //controllerAs: 'vm'
        })
        .state('products', {
          url: '/products',
          templateUrl: 'app/products/products.html',
          controller: 'productsController',
          //controllerAs: 'vm'
        });

      $urlRouterProvider.otherwise('/');
    }

  }
}
