angular.module("LoginMdl", [])

    .controller("LoginCtrl", function ($http) {

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

        vm.isNewFresher = function () {
            var bool = true;
            vm.freshers.forEach(function (entry) {
                if (entry.toUpperCase() === vm.user.fresher.toUpperCase()) {
                    bool = false;
                }
            });
            return bool;
        };

        vm.user = {};

    });