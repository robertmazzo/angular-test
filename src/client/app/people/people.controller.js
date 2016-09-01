(function() {
  'use strict';

  angular
    .module('app.people')
    .controller('PeopleController', PeopleController);

  PeopleController.$inject = ['$q', '$state', 'dataservice', 'logger'];
  /* @ngInject */
  function PeopleController($q, $state, dataservice, logger) {
    var vm = this;
    //vm.people=[{}]; // TEST: fakes the people spec to pass.

    vm.gotoPerson = gotoPerson; // see ng-click on people view
    getPeople();

    function getPeople() {
      return dataservice.getPeople().then(function (response) {
        vm.people = response;
        logger.success('got some people');
      });
    }

    function gotoPerson(p) {
      $state.go('person', {id: p.id});
      $rootScope.$apply();  // why do we need to flush here ? Just for the testing module ???
      logger.info('went to person: ' + p.id)
    }
  }
})();
