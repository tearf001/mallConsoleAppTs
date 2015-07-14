/// <reference path="../../.tmp/typings/tsd.d.ts" />



/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="home/home.controller.ts" />
/// <reference path="../app/components/navbar/navbar.directive.ts" />
/// <reference path="../app/components/debug-dev/debug-dev.directive.ts" />
/// <reference path="../app/components/webDevTec/webDevTec.service.ts" />
/// <reference path="../app/components/webDevTec/webDevTec.service.ts" />
/// <reference path="../app/components/Auth/authInterceptorService.ts" />
/// <reference path="../app/components/Auth/authService.ts" />

/// <reference path="../app/public-set/public-set.service.ts" />
/// <reference path="../app/public-set/public-set.controller.ts" />

/// <reference path="../app/orders/orders.service.ts" />
/// <reference path="../app/orders/orders.controller.ts" />

/// <reference path="../app/products/products.service.ts" />
/// <reference path="../app/products/products.controller.ts" />
/// <reference path="../app/comments/comments.service.ts" />
//  <reference path="../app/comments/comments.controller.ts" />



declare var malarkey: any;
declare var toastr: Toastr;
declare var moment: moment.MomentStatic;

module mallConsoleApp {
  'use strict';

  angular.module('mallConsoleApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap'])
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('restBaseUrl','http://localhost:7245/api')
    .config(Config)
    .config(RouterConfig)
    .config(['restangular','restBaseUrl',function (Restangular,restBaseUrl) {
      Restangular.withConfig(function(RestangularConfigurer){
        RestangularConfigurer.setBaseUrl(restBaseUrl);
      });
    }])

    .run(RunBlock)
    .run(RunDebugConfig)
    .service('webDevTec', WebDevTecService)
    .service('ordersService', OrdersService)
    .service('commentsService', CommentsService)
    .service('productsService', OrdersService)
    .service('utils',Utils)
    .controller('homeController', HomeController)
    .controller('ordersController', OrdersController)
    .controller('productsController', ProductsController)
    .controller('commentsController', CommentsController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('debugDev', debugDev)
    .factory('authInterceptorService',
    ['$q', '$injector','$location', '$sessionStorage',
      ($q, $injector,$location, $sessionStorage) => AuthInterceptorService($q, $injector,$location, $sessionStorage)])
    .factory('authService',
    ['$http', '$q','$sessionStorage', 'ngAuthSettings',
      ($http, $q, $sessionStorage, ngAuthSettings) => authService($http, $q, $sessionStorage, ngAuthSettings)]);
}
