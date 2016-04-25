angular.module("UserMdl", [])

    .controller("UserController", function ($http, $location) {

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

        vm.isAuthenticated = function () {
            if(this.user.fresher != null) {
                return true;
            } else {
                return false;
            }
        };

        vm.login = function (user) {
            $http.post("/StartUp/php/router.php/user/login", {user: user})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                        $location.path("/utente");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.logout = function () {
            $http.get("/StartUp/php/router.php/user/logout")
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.user = {};
                        $location.path("/");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.registration = function (user) {
            $http.post("/StartUp/php/router.php/user/create", {user: user})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                        $location.path("/utente");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.changeEmail = function (email) {
            $http.post("/StartUp/php/router.php/user/email", {email: email})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                        $location.path("/utente");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.changePassword = function (user) {
            $http.post("/StartUp/php/router.php/user/password", {user: user})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                        $location.path("/utente");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.changePhoto = function (photo) {
            $http.post("/StartUp/php/router.php/user/photo", {photo: photo})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                        $location.path("/utente");
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.delete = function (password) {
            $http.post("/StartUp/php/router.php/user/delete", {password: password})
                .success(function(data, status, headers, config) {
                        vm.getUser();
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.getUser();
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

    });