module mallConsoleApp {
  'use strict';

  export function AuthInterceptorService ($q: ng.IQService,
                                          $injector: ng.auto.IInjectorService,
                                          $location: ng.ILocationService,
                                          $sessionStorage: any){

    var authInterceptorServiceFactory:any = {};
    //头封装  包含token
    var _request = function (config) {
      //console.log('-----**----',config);
      config.headers = config.headers || {};

      var authData = $sessionStorage['authorizationData'];
      if (authData) {
        config.headers.Authorization = 'Bearer ' + authData.token;
      }
      return config;
    }
    //异常处理
    var _responseError = function (rejection) {
      //无权访问
      if (rejection.status === 401) {
        $injector.get('authService').logOut();
        $location.path('/account/login');
      }
      return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;

  }

}
