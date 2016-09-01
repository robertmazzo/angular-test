/* jshint -W117, -W030 */
describe('dataservice', function() {

  beforeEach(function() {
    bard.appModule('app.core');
    bard.inject('$httpBackend', '$q', 'dataservice', '$rootScope');
  });

  it('exists', function () {
    expect(dataservice).to.exist;
  });

  // uses $when to mock a fake count; compare with getpeople() in people.controller.spec.js
  it('getMessageCount returns a value', function () {
    dataservice.getMessageCount().then(function (data) {
      expect(data).to.exists;
      //expect('hello').to.equal('ward');
    });
    $rootScope.$apply();  // **** we need the digest cycle to make the $q work;
                          // it tell the mocking framework to FLUSH THE QUEUE ****
  });

  // This test specifically tests the call to that end point; not really to fake the data.
  it('getPeople hits the right /api/people service', function () {
    $httpBackend.when('GET', '/api/people').respond(200,[]); // no data
    dataservice.getPeople().then(function (data) {
      expect(data).to.exist;
    });
    $httpBackend.flush();
  });

  // Testing for a server error
  it('getPeople reports an error if server fails', function () {
    $httpBackend.when('GET', '/api/people').respond(500,{description: 'you fail'}); // FORCE ERROR with error object required in dataservice fail()
    dataservice.getPeople().catch(function (error) {
      console.log(error);
      expect(error.data.description).to.match(/you fail/);
    });
    $httpBackend.flush();
  });

  it.skip('this is skipped', function () {

  });
});
