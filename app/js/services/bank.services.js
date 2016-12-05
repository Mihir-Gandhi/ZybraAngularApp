(function () {
    'use strict';
    angular
        .module('ZybraBankApp')
        .service("BankService", ['$http','$resource','$q', BankService]);

    function BankService($http,$resource, $q) {
        var ngAuthSettings = { apiServiceBaseUri: 'http://localhost:29926/' };
        var resourceInstance = $resource(
        ngAuthSettings.apiServiceBaseUri + "/BankApplication/:action",
        {},
        {
            'getAllBanks': { method: 'GET', params: { action: 'GetBankData' } },
            'getAllCityNames': { method: 'GET', params: { action: 'GetCityData' } },
            'getAllBranches': { method: 'GET', params: { action: 'GetBranches' } }
        });

       this.getAllBanks = function () {
           return resourceInstance.getAllBanks().$promise.then(function (response) {
               if (response) {
                   return response;
               }
           });
       };

       this.getAllCityNames = function (data) {
           return resourceInstance.getAllCityNames(data).$promise.then(function (response) {
               if (response) {
                   return response;
               }
           });
       };

       this.getAllBranches = function (branchRequest) {
           return resourceInstance.getAllBranches(branchRequest).$promise.then(function (response) {
               if (response) {
                   return response;
               }
           });
       };
    }
})();
