angular.module("RegistrationMdl", [])

    .controller("RegistrationCtrl", function ($http) {

        var vm = this;

        vm.freshers = [];

        vm.getFreshers = function () {
            $http.get("/StartUp/php/router.php/freshers")
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

        vm.isExistingFresher = function () {
            if (vm.freshers.indexOf(vm.user.fresher) !== -1) {
                return true;
            } else {
                return false;
            }
        };

        vm.emails = [];

        vm.getEmails = function () {
            $http.get("/StartUp/php/router.php/emails")
                .then(
                    function (json) {
                        if (!json.data.error) {
                            json.data.emails.forEach(function (entry) {
                                vm.emails.push(entry);
                            });
                        }
                    }, function (error) {
                        console.log(error);
                    }
                );
        };

        vm.getEmails();

        vm.isExistingEmail = function () {
            if (vm.emails.indexOf(vm.user.email) !== -1) {
                return true;
            } else {
                return false;
            }
        };

        vm.isInvalidEmail = function () {
            if (vm.user.email != null) {
                if (!vm.user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        };

        vm.user = {};

        vm.createUser = function () {
            if (!vm.isInvalidEmail() && !vm.isExistingFresher() && !vm.isExistingEmail()) {
                console.log(vm.user);
                $http.post("/StartUp/php/router.php/user/create", {user: vm.user})
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