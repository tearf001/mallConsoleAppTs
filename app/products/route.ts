/**
 * Created by Administrator on 2015/7/14.
 */
module mallConsoleApp {
  'use strict';

  export class ProductsRouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('products', {
          url: '/products',
          templateUrl: 'app/products/products.html',
          resolve: {
            products: ['productsService',
              function (products) {
                return products.all();
              }]
          },
          controller: ['$scope', '$state', '$http', '$timeout', 'products',
            function ($scope, $state, $http, $timeout, products) {
              $scope.products = products;
              $scope.newItem = {};
              $scope.states = {
                newForm: false,
                isAdding: false
              };
              $scope.types = [{text: '移动终端', value: '1'}, {text: '流量卡', value: '2'}, {
                text: '电信增值服务',
                value: '3'
              }];
              $scope.showForm = function (sf) {
                $scope.states.newForm = sf;
              }
              $scope.addProduct = function (prod) {
                $scope.states.isAdding = true;
                //$http.post(prod).then...
                $timeout(  //模拟HTTP请求
                  $scope.products.push(prod)
                  , 500)
                  //动态效果消失
                  .finally(function () {
                    $scope.states.isAdding = false;
                    $scope.newItem = {};
                  });

              }
            }]
        });
    }

  }
}
