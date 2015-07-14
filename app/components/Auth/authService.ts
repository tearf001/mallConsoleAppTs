module mallConsoleApp {
  'use strict';

  export function authService ($http, $q, $sessionStorage, ngAuthSettings) {

  var serviceBase = ngAuthSettings.apiServiceBaseUri;
  var authServiceFactory:any = {};

  var _authentication = {
    isAuth: false,
    userName: "",
    useRefreshTokens: false
  };

  var _saveRegistration = function (registration) {

    _logOut();

    return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
      return response;
    });

  };

  var _login = function (loginData) {

    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + ngAuthSettings.clientId;
    }

    var deferred = $q.defer();
    var response = {access_token:'23234241-1123-23'};
    $sessionStorage.authorizationData = {
      token: response.access_token,
      userName: loginData.userName,
      refreshToken: "",
      useRefreshTokens: false
    };

    _authentication.isAuth = true;
    _authentication.userName = loginData.userName;
    _authentication.useRefreshTokens = loginData.useRefreshTokens;
    deferred.resolve(response);
    return deferred.promise;
    //console.log(data);
    //实际代码
    //$http.post(serviceBase + 'token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    //    .success(function (response) {
    //        if (loginData.useRefreshTokens) {
    //            $sessionStorage.authorizationData= {
    //                token: response.access_token,
    //                userName: loginData.userName,
    //                refreshToken: response.refresh_token,
    //                useRefreshTokens: true
    //            }
    //        }
    //        else {
    //            $sessionStorage.authorizationData= {
    //                token: response.access_token,
    //                userName: loginData.userName,
    //                refreshToken: "",
    //                useRefreshTokens: false
    //            };
    //        }
    //        _authentication.isAuth = true;
    //        _authentication.userName = loginData.userName;
    //        _authentication.useRefreshTokens = loginData.useRefreshTokens;
    //
    //        deferred.resolve(response);
    //
    //    }).error(function (err, status) {
    //        _logOut();
    //        deferred.reject(err);
    //    });
    //
    //return deferred.promise;

  };
  var _changePassword = function (userName, oldpass, newpass) {

    console.log('arguments', arguments)
    var data = {
      'UserName': userName,
      'OldPassword': oldpass,
      'Password': newpass,
      'ConfirmPassword': newpass
    };
    return $http.post(serviceBase + 'api/account/ChangePassword', data).then(function (response) {
      return response;
    }, function (ex) {
      alert('有错误发生!' + ex);
      console.log('error', ex);
      return ex;
    })

  }
  var _logOut = function () {

    delete $sessionStorage['authorizationData'];
    console.log('you call logout!')
    _authentication.isAuth = false;
    _authentication.userName = "";
    _authentication.useRefreshTokens = false;

  };

  var _fillAuthData = function () {

    var authData = $sessionStorage['authorizationData'];
    if (authData) {
      _authentication.isAuth = true;
      _authentication.userName = authData.userName;
      _authentication.useRefreshTokens = authData.useRefreshTokens;
    }

  };

  var _refreshToken = function () {
    var deferred = $q.defer();

    var authData = $sessionStorage['authorizationData'];

    if (authData) {

      if (authData.useRefreshTokens) {

        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

        delete $sessionStorage['authorizationData'];

        $http.post(serviceBase + 'token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (response) {

          $sessionStorage['authorizationData'] = {
            token: response.access_token,
            userName: response.userName,
            refreshToken: response.refresh_token,
            useRefreshTokens: true
          };
          deferred.resolve(response);

        }).error(function (err, status) {
          _logOut();
          deferred.reject(err);
        });
      }
    }

    return deferred.promise;
  };

  authServiceFactory.saveRegistration = _saveRegistration;
  authServiceFactory.login = _login;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.changePassword = _changePassword;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.authentication = _authentication;
  authServiceFactory.refreshToken = _refreshToken;

  return authServiceFactory;
}

}
