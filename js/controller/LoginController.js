angular.module("LoginMdl", [])
        .controller("LoginCtrl", function ($http) {

            var vm = this;

            vm.freshers = [];
            $http.get("http://localhost/StartUp/php/router.php/freshers").success(function (data) {
                data.forEach(function (entry) {
                    vm.freshers.push(entry);
                });
            }).error(function (error) {
                console.log(error);
            });

            vm.checkFresher = function () {
                if (vm.freshers.indexOf(vm.user.fresher) == -1) {
                    return true;
                } else {
                    return false;
                }
            }


            vm.user = {};

            vm.authenticateUser = function () {
                if (!vm.checkFresher()) {
                    $http({
                        data: {
                            user: vm.user
                        }, headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: 'http://localhost/StartUp/php/router.php/user/login'
                    })
                }
            };

        });