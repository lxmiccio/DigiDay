angular.module("LoginMdl", [])

    .controller("LoginCtrl", function ($http) {

        var vm = this;

        vm.freshers = [];

        vm.getFreshers = function () {
            $http.get("php/router.php/freshers")
                .then(
                    function (json) {
                        if (!json.data.error) {
                            json.data.freshers.forEach(function (entry) {
                                vm.freshers.push(entry);
                            });
                        }
                    }, function (error) {
                        console.log(error);
                    }
                );
        };

        vm.getFreshers();

        vm.isNewFresher = function () {
            if (vm.freshers.indexOf(vm.user.fresher) === -1) {
                return true;
            } else {
                return false;
            }
        };

        vm.user = {};

        vm.authenticateUser = function () {
            if (!vm.isNewFresher()) {
                $http.post("php/router.php/user/login", {user: vm.user})
                    .then(
                        function (json) {
                            //TO DO
                        }, function (json) {
                            //TO DO
                        }
                    );
            }
        };

    });