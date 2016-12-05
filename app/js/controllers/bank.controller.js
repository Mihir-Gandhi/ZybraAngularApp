(function () {
    'use strict';
    angular
        .module('ZybraBankApp')
        .controller('BankController', ['BankService', BankController]);

    function BankController(BankService) {
        var self = this;
        self.BankService = BankService;
        self.selectedBankName = '';
        self.getBankData();
    }

    BankController.prototype.getBankData = function () {
        var self = this;
        return self.BankService.getAllBanks()
      .then(function (searchResult) {
          if (searchResult)
              self.bankData = searchResult.banks;
      }, function (e) { self.handleError(e); });
    }

    BankController.prototype.getCityNames = function (selectedbankName) {
        var self = this;
        var Bank = { bankName: selectedbankName };
        return self.BankService.getAllCityNames(Bank)
      .then(function (searchResult) {
          self.cityData = [];
          for (var i = 0; i < searchResult.cities.length; i++) {
              self.cityData.push({ cityName: searchResult.cities[i] });
          }
      }, function (e) { self.handleError(e); });
    }

    BankController.prototype.getBranchNames = function (selectedbankName, selectedCityName) {
        var self = this;
        var BranchRequest = { branchName: selectedbankName, city: selectedCityName };
        return self.BankService.getAllBranches(BranchRequest)
      .then(function (searchResult) {
          if (searchResult)
              self.branchData = searchResult.branches;
      }, function (e) { self.handleError(e); });
    }

    BankController.prototype.handleError = function (error) {
        var self = this;
        console.log(error);
    }
})();