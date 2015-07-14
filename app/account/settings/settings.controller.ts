module mallConsoleApp {
  'use strict';

  'use strict';
  interface settingScope extends ng.IScope {
    authentication: any;
    errors: any;
    message:any;
    submitted:any;
    user:any;
    changePassword: Function;
  }
  export class SettingsController {

    constructor($scope: settingScope, $location: ng.ILocationService, authService: any) {
      $scope.authentication = authService.authentication;
      if (!$scope.authentication.isAuth) $location.path('/account/login');// console.log(authService.authentication)
      $scope.errors = {};

      $scope.changePassword = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          console.log(authService);
          authService.changePassword(authService.authentication.userName, $scope.user.oldPassword, $scope.user.newPassword)
            .then(function () {
              $scope.message = '密码已更改.';
              alert($scope.message)
              $location.path('/');
            })
            .catch(function (ex) {
              form.password.$setValidity('mongoose', false);
              $scope.errors.other = 'Incorrect password';
              $scope.message = '';
              console.log(ex);
            });
        }
      };

    }

  }
}
