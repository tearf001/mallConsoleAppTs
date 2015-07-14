module mallConsoleApp {
  'use strict';

  export class RunBlock {
    /** @ngInject */
    constructor($log: ng.ILogService) {
      $log.debug('runBlock end');
    }

  }
  export class RunDebugConfig {

    constructor($rootScope: ng.IRootScopeService,
                $state: angular.ui.IStateService,
                $stateParams: angular.ui.IStateParamsService,
                $log: ng.ILogService) {
      $rootScope['$state'] = $state;
      $rootScope['$stateParams'] = $stateParams;
      $rootScope.$on('$stateChangeError', function (event: ng.IAngularEvent, state: any) {
        $log.debug(event, state);
      });
      $rootScope.$on('$stateChangeStart', function (event: ng.IAngularEvent, state: any) {
        // todo
      });

    }

  }
}
