/**
 * Created by wongxinhai on 15/7/12.
 */
module mallConsoleApp {
  'use strict';
  export interface IProductsService {
    all(): ng.IPromise<any>;
    localAll(): ng.IPromise<any>;
    testAll(): ng.IPromise<any>;
  }

  export class ProductsService implements IProductsService {
    private $http:ng.IHttpService;
    private utils :IUtils;
    private Restangular :restangular.IService;
    private productsPromise :ng.IPromise<any>;
    private $q;

    constructor( $q:ng.IQService,$http:ng.IHttpService,utils :IUtils,Restangular:restangular.IService ){
      this.$http = $http;
      this.utils = utils;
      this.$q = $q;
      this.Restangular = Restangular;
      var path = 'assets/products.json';
      var heads= {header : {'Content-Type' : 'application/json; charset=utf-8'}};
      this.productsPromise = $http.get(path,heads).then(function (resp) {
        console.log(resp.data.data);
        return resp.data.data;
      }, function (error) {
        console.log(error);
        return error;
      });
      Restangular.all("Products")
    }
    public all():ng.IPromise<any> {
      return this.$q.when([]);
    }
    public testAll():any[]{
      return this.Restangular.all("TestResource").getList().$object;
    }
    public localAll():ng.IPromise<any> {
      return this.productsPromise;
    }
  }
}

