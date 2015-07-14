/**
 * Created by wongxinhai on 15/7/12.
 */
module mallConsoleApp {
  'use strict';

  interface IScope extends ng.IScope {
    products: any[];


  }
  export class ProductsController {
    constructor( $scope: IScope) {

      $scope.products = [{name: 'prod1'}, {name: 'prod2'}];

    }
  }
}
