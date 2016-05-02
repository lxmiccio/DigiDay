angular.module("UserMdl", [])

        .controller("UserCtrl", function ($http, $location, $scope, $uibModal, Form) {

            $scope.open = function (view) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: "lg",
                    templateUrl: view,
                    resolve: {
                        Form: function () {
                            return vm.Form;
                        },
                        deleteUser: function () {
                            return vm.deleteUser;
                        },
                        login: function () {
                            return vm.login;
                        },
                        registration: function () {
                            return vm.registration;
                        },
                        updateEmail: function () {
                            return vm.updateEmail;
                        },
                        updateImage: function () {
                            return vm.updateImage;
                        },
                        updatePassword: function () {
                            return vm.updatePassword;
                        }
                    },
                    controller: function ($http, $location, $scope, $uibModalInstance, Form, deleteUser, login, registration, updateEmail, updateImage, updatePassword) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

                        $scope.Form = Form;

                        $scope.deleteUser = function (password) {
                            deleteUser(password);
                            $location.url("/");
                            $scope.cancel();
                        };

                        $scope.login = function (logUser) {
                            login(logUser);
                            $scope.cancel();
                        };

                        $scope.registration = function (newUser) {
                            registration(newUser);
                            $scope.cancel();
                        };

                        $scope.updateEmail = function (newEmail) {
                            updateEmail(newEmail);
                            $scope.cancel();
                        };

                        $scope.updateImage = function (newImage) {
                            updateImage(newImage);
                            $scope.cancel();
                        };

                        $scope.updatePassword = function (user) {
                            updatePassword(user);
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
                    }
                });
            };

            $scope.stringToDate = function (string) {
                var date = new Date(string);
                date.setDate(date.getDate());
                return date;
            };

            var vm = this;

            vm.Form = Form;

            vm.user = {};

            vm.getUser = function () {
                $http.get("/DigiDay/php/router.php/user/me")
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.user.fresher = data.user.fresher;
                                vm.user.firstName = data.user.firstName;
                                vm.user.lastName = data.user.lastName;
                                vm.user.email = data.user.email;
                                vm.user.birthdate = data.user.birthdate;
                                vm.user.role = data.user.role;
                                vm.user.sex = data.user.sex;
                                vm.user.image = data.user.image;
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.getUser();

            vm.isAuthenticated = function () {
                if (vm.user) {
                    if (vm.user.fresher) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };

            vm.login = function (user) {
                $http.post("/DigiDay/php/router.php/user/login", {user: user})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.getUser();
                                $location.path("/utente");
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.logout = function () {
                $http.get("/DigiDay/php/router.php/user/logout")
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.user = {};
                                $location.path("/");
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

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

            vm.updateEmail = function (email) {
                $http.post("/DigiDay/php/router.php/user/email", {email: email})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.user.email = email;
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.updatePassword = function (user) {
                $http.post("/DigiDay/php/router.php/user/password", {user: user})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.getUser();
                                $location.path("/utente");
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.updateImage = function (image) {
                $http.post("/DigiDay/php/router.php/user/image", {image: image})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                vm.user.image = image;
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