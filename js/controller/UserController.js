angular.module("UserMdl", [])

    .controller("UserController", function ($http) {

        var vm = this;

        vm.user = {};

        vm.getUser = function () {
            $http.get("/StartUp/php/router.php/user/me")
                .then(
                    function (json) {
                        vm.user.fresher = json.data.user.fresher;
                        vm.user.firstName = json.data.user.firstName;
                        vm.user.lastName = json.data.user.lastName;
                        vm.user.email = json.data.user.email;
                        vm.user.birthdate = json.data.user.birthdate;
                        vm.user.role = json.data.user.role;
                        vm.user.sex = json.data.user.sex;
                        vm.user.photo = json.data.user.photo;
                    }, function (json) {
                        //TO DO
                    });
        };

        vm.getUser();

        vm.isAuthenticated = function () {
            if(this.user.fresher != null) {
                return true;
            } else {
                return false;
            }
        };

        vm.login = function () {
            $http.post("/StartUp/php/router.php/user/login", {user: vm.user})
                            .then(
                                    function (json) {
                                            //TO DO
                                    }, function (json) {
                                //TO DO
                            }
                            );
        };

        vm.logout = function () {
            vm.user = {};
        };

    });