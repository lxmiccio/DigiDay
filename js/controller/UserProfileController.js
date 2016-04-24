angular.module("UserProfileMdl", [])

    .controller("UserProfileController", function ($http) {

        var vm = this;

        vm.user = {};

        vm.getUser = function () {
            $http.get("/StartUp/php/router.php/user/me")
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.user.fresher = data.user.fresher;
                        vm.user.firstName = data.user.firstName;
                        vm.user.lastName = data.user.lastName;
                        vm.user.email = data.user.email;
                        vm.user.birthdate = data.user.birthdate;
                        vm.user.role = data.user.role;
                        vm.user.sex = data.user.sex;
                        vm.user.photo = data.user.photo;
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getUser();

    });