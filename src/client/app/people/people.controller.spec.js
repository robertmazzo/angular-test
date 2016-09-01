/* jshint -W117, -W030 */
describe('PeopleController', function() {
  var controller;
  var people = mockData.getMockPeople();

  // Note: This gets executed for each test; and it resets the module/injections fresh for each test.
  // It's reset for each test because new mocks may be used for each test. A clean slate for each test is important.
  beforeEach(function() {
    module('app.people'); // we need the angular module here for $state to work in test below; Ward's bard lib is not allowing $state right now.
    bard.appModule('app.people');
    bard.inject('$controller', '$log', '$q', '$rootScope', '$state');
    expect($state.go).to.be.defined;
    var ds = {
      getPeople: function () {
        return $q.when(people); // RETURNS A FULLY-RESOLVED PROMISE !!!!!!!!
      }
    };
    controller = $controller('PeopleController',{
      dataservice: ds
    }); // Before each test,  create an instance of a controller; pass in dataservice
        // we do not have to pass in the other arguments to peopleController (i.e. $q and logger)
  });

  it('hello test', function () {
    expect('hello').to.equal('hello');
  });

  // SHOULD FAIL HERE
  it('goodbye test', function () {
    expect('hello').to.equal('goodbye');
  });

  it('controller has people', function () {
    expect(controller).to.exist;
  });
  it('controller has no people', function () {
    expect(controller).to.not.exist;
  });


  it('should have empty people array before activation', function () {
    expect(controller.people).to.exist;
  });

  describe('after activation', function () {
    //using chai assertion lib - http://chaijs.com/api/bdd/#method_above
    beforeEach(function () {
      bard.inject('$state');  // we can inject here rather than inside beforeEach above
      $rootScope.$apply();
    });
    it('selecting a person triggers state change', function () {
      controller.gotoPerson({id: 3});
      $rootScope.$apply();
      expect($state.current.name).to.equal('person'); // *** DOESN'T WORK; $state is not real;
                                                      // I think the bard.js lib is faking $state, so the test fails
    });
    it('should have people', function () {
      //$rootScope.$apply();  // moved to the beforeEach section
      // two possible ways to test here - check for above zero, or people.lengths
      expect(controller.people).to.have.length.above(0);  // THROWS chai EXCEPTION IN BROWSER TEST IF PEOPLE NOT DEFINED.
    });
    it('should have mock people', function () {
      //$rootScope.$apply();  // moved to beforeEach
      // two possible ways to test here - check for above zero, or people.lengths
      expect(controller.people).to.have.length(people.length);
    });
  });

});
