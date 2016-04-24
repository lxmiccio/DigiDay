angular.module("RegistrationMdl", [])

    .controller("RegistrationCtrl", function ($http) {

        var vm = this;

        vm.freshers = [];

        vm.getFreshers = function () {
            $http.get("/StartUp/php/router.php/freshers")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.freshers)) {
                        data.freshers.forEach(function (entry) {
                            vm.freshers.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getFreshers();

        vm.isExistingFresher = function () {
            var bool = false;
            vm.freshers.forEach(function (entry) {
                if (entry.toUpperCase() === vm.user.fresher.toUpperCase()) {
                    bool = true;
                }
            });
            return bool;
        };

        vm.emails = [];

        vm.getEmails = function () {
            $http.get("/StartUp/php/router.php/emails")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.emails)) {
                        data.emails.forEach(function (entry) {
                            vm.emails.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getEmails();

        vm.isExistingEmail = function () {
            var bool = false;
            vm.emails.forEach(function (entry) {
                if (entry.toUpperCase() === vm.user.email.toUpperCase()) {
                    bool = true;
                }
            });
            return bool;
        };

        vm.isInvalidEmail = function () {
            if (vm.user.email != null) {
                if (vm.user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        };

        vm.user = {};

    });