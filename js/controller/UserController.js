angular.module("UserMdl", [])

        .controller("UserCtrl", function ($http, $location, $scope, $uibModal, Form, User) {

            $scope.openUser = function (size, view) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    controller: function ($http, $location, $scope, $uibModalInstance, Form, User) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

                        $scope.Form = Form;
                        $scope.User = User;

                        $scope.registration = function (newUser) {
                            registration(newUser);
                            $scope.cancel();
                        };

                        $scope.updateEmail = function (newEmail) {
                            $scope.User.updateEmail(newEmail);
                            $scope.cancel();
                        };

                        $scope.updateImage = function (newImage) {
                            $scope.User.updateImage(newImage);
                            $scope.cancel();
                        };

                        $scope.updatePassword = function (user) {
                            $scope.User.updatePassword(user);
                            $scope.cancel();
                        };

                        $scope.freshers = [];

                        $scope.emails = [];

                        $http.get("/DigiDay/php/router.php/freshers")
                                .success(function (data, status, headers, config) {
                                    if (Array.isArray(data.freshers)) {
                                        data.freshers.forEach(function (entry) {
                                            $scope.freshers.push(entry);
                                        });
                                    }
                                })
                                .error(function (data, status, headers, config) {
                                    console.log(data);
                                });

                        $http.get("/DigiDay/php/router.php/emails")
                                .success(function (data, status, headers, config) {
                                    if (Array.isArray(data.emails)) {
                                        data.emails.forEach(function (entry) {
                                            $scope.emails.push(entry);
                                        });
                                    }
                                })
                                .error(function (data, status, headers, config) {
                                    console.log(data);
                                });
                    },
                    resolve: {
                    },
                    size: size,
                    templateUrl: view,
                });
            };

            $scope.stringToDate = function (string) {
                var date = new Date(string);
                date.setDate(date.getDate());
                return date;
            };

            var vm = this;

            vm.Form = Form;
            vm.User = User;

            vm.registration = function (user) {
                $http.post("/DigiDay/php/router.php/user/create", {user: user})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                console.log(user);
                                vm.getUser();
                                $location.path("/utente");
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.deleteUser = function (password) {
                $http.post("/DigiDay/php/router.php/user/delete", {password: password})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.user = {};
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };
        });