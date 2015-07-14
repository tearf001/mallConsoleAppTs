module mallConsoleApp {
  'use strict';

  /** @ngInject */
  export function debugDev(): ng.IDirective {

    return {
      restrict: 'E',
      templateUrl: 'app/components/debug-dev/debug-dev.html'
    };

  }

}
