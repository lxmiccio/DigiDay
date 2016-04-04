angular.module("RegistrationMdl", [])
        .controller("RegistrationCtrl", function ($http) {

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
                if (vm.freshers.indexOf(vm.user.fresher) != -1) {
                    return true;
                } else {
                    return false;
                }
            }


            vm.emails = [];
            $http.get("http://localhost/StartUp/php/router.php/emails").success(function (data) {
                data.forEach(function (entry) {
                    vm.emails.push(entry);
                });
            }).error(function (error) {
                console.log(error);
            });

            vm.checkEmail = function () {
                if (vm.emails.indexOf(vm.user.email) != -1) {
                    return true;
                } else {
                    return false;
                }
            }

            vm.validateEmail = function () {
                if (vm.user.email != null) {
                    if (!vm.user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }


            vm.user = {};

            vm.registerUser = function () {
                if (!vm.validateEmail() && !vm.checkFresher() && !vm.checkEmail()) {
                    $http({
                        data: {
                            user: vm.user
                        }, headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: 'http://localhost/StartUp/php/router.php/user/registration'
                    })
                }
            };

        });