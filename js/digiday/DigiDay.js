angular.module("DigiDayMdl", ["ngRoute", "mwl.calendar", "nya.bootstrap.select", "ui.bootstrap", "AdministratorMdl", "CalendarMdl", "SessionMdl"])

        .config(["$routeProvider", function ($routeProvider) {

                $routeProvider.when("/", {
                    templateUrl: "views/calendar/calendar.html"
                });
                $routeProvider.when("/accedi", {
                    templateUrl: "views/login.html"
                });
                $routeProvider.when("/registrati", {
                    templateUrl: "views/registration.html"
                });
                $routeProvider.when("/amministratore", {
                    templateUrl: "views/administrator/administrator.html"
                });
                $routeProvider.when("/utente", {
                    templateUrl: "views/user/user.html"
                });
                $routeProvider.when("/utente/sessioni", {
                    templateUrl: "views/user/sessioni.html"
                });
                $routeProvider.when("/sessione/crea", {
                    templateUrl: "views/session/session.html"
                });
                $routeProvider.when("/sessione/iscriviti", {
                    templateUrl: "views/takePart.html"
                });
                $routeProvider.otherwise({
                    templateUrl: "views/calendar/calendar.html"
                });
            }])

        .controller("HomeCtrl", function ($scope, $uibModal, User, Utility) {

            var vm = this;

            vm.User = User;
            vm.Utility = Utility;

            $scope.open = function (view) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    controller: function ($http, $location, $scope, $timeout, $uibModalInstance, Form, User, Utility) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

                        $scope.Form = Form;
                        $scope.User = User;
                        $scope.Utility = Utility;

                        $scope.showErrorMessage = false;
                        $scope.showSuccessMessage = false;

                        $scope.login = function (user) {
                            $scope.User.login(user, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Autenticazione riuscita!";
                                $timeout(function () {
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Autenticazione fallita!";
                                $scope.submessage = "Matricola e Password non corrispondono";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
                        };

                        $scope.create = function (user) {
                            $scope.User.create(user, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Utente creato con successo!";
                                $timeout(function () {
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Impossibile creare l'Utente!";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
                        };

                        $scope.deleteUser = function (password) {
                            $scope.User.deleteUser(password, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Utente eliminato con successo!";
                                $timeout(function () {
                                    $location.url("/");
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Impossibile eliminare l'Utente!";
                                $scope.submessage = "La Password attuale non corrisponde";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
                        };

                        $scope.updateEmail = function (email) {
                            $scope.User.updateEmail(email, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Email modificata con successo!";
                                $timeout(function () {
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Impossibile modificare l'Email!";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
                        };

                        $scope.updateImage = function (image) {
                            $scope.User.updateImage(image, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Immagine modificata con successo!";
                                $timeout(function () {
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Impossibile modificare l'Immagine!";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
                        };

                        $scope.updatePassword = function (user) {
                            $scope.User.updatePassword(user, function () {
                                $scope.showSuccessMessage = true;
                                $scope.message = "Password modificata con successo!";
                                $timeout(function () {
                                    $scope.showSuccessMessage = false;
                                    $scope.cancel();
                                }, 1000);
                            }, function () {
                                $scope.showErrorMessage = true;
                                $scope.message = "Impossibile modificare la Password!";
                                $scope.submessage = "La Password attuale non corrisponde";
                                $timeout(function () {
                                    $scope.showErrorMessage = false;
                                }, 3000);
                            });
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
                    size: "md",
                    templateUrl: view
                });
            };

            $scope.openSession = function (view) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    controller: function ($http, $scope, $timeout, $uibModalInstance, Form, User) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

                        $scope.Form = Form;
                        $scope.User = User;

                        $scope.classrooms = [];

                        $scope.getClassrooms = function () {
                            $http.get("/DigiDay/php/router.php/classrooms")
                                    .success(function (data, status, headers, config) {
                                        if (Array.isArray(data.classrooms)) {
                                            data.classrooms.forEach(function (entry) {
                                                $scope.classrooms.push(entry);
                                            });
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };

                        $scope.getClassrooms();

                        $scope.items = [];

                        $scope.getItems = function () {
                            $http.get("/DigiDay/php/router.php/items")
                                    .success(function (data, status, headers, config) {
                                        if (Array.isArray(data.items)) {
                                            data.items.forEach(function (entry) {
                                                $scope.items.push(entry);
                                            });
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };

                        $scope.getItems();

                        $scope.topics = [];

                        $scope.getTopics = function () {
                            $http.get("/DigiDay/php/router.php/topics")
                                    .success(function (data, status, headers, config) {
                                        if (Array.isArray(data.topics)) {
                                            data.topics.forEach(function (entry) {
                                                $scope.topics.push(entry);
                                            });
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };

                        $scope.getTopics();

                        $scope.create = function (session) {
                            console.log(session);
                            $http.post("/DigiDay/php/router.php/session/create", {session: session})
                                    .success(function (data, status, headers, config) {
                                        if (data.error) {
                                            console.log(data);
                                        } else {
                                            console.log(data);
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };
                    },
                    size: "lg",
                    templateUrl: view
                });
            };
        })

        .factory("Form", function () {

            return {
                isExistingClassroom: function (classrooms, classroom) {
                    var bool = false;
                    if (classroom && classroom.name) {
                        classrooms.forEach(function (entry) {
                            if (entry.name.toUpperCase() === classroom.name.toUpperCase()) {
                                bool = true;
                            }
                        });
                    }
                    return bool;
                },
                isExistingEmail: function (emails, email) {
                    var bool = false;
                    if (emails && email) {
                        emails.forEach(function (entry) {
                            if (entry.toUpperCase() === email.toUpperCase()) {
                                bool = true;
                            }
                        });
                    }
                    return bool;
                },
                isExistingFresher: function (freshers, fresher) {
                    var bool = false;
                    if (fresher) {
                        freshers.forEach(function (entry) {
                            if (entry.toUpperCase() === fresher.toUpperCase()) {
                                bool = true;
                            }
                        });
                    }
                    return bool;
                },
                isInvalidCapacity: function (classroom) {
                    var bool = true;
                    if (classroom && classroom.capacity) {
                        if (classroom.capacity.match(/^[0-9]+$/)) {
                            if (classroom.capacity >= 10 && classroom.capacity <= 50) {
                                bool = false;
                            }
                        }
                    }
                    return bool;
                },
                isInvalidEmail: function (email) {
                    var bool = true;
                    if (email) {
                        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                            bool = false;
                        }
                    }
                    return bool;
                },
                isInvalidMaximumPartecipants: function (capacity, maximumPartecipants) {
                    var bool = true;
                    if (capacity) {
                        if (maximumPartecipants) {
                            if (maximumPartecipants.toString().match(/^[0-9]+$/)) {
                                if (parseInt(maximumPartecipants) <= parseInt(capacity)) {
                                    bool = false;
                                }
                            }
                        }
                    }
                    return bool;
                },
                isNewFresher: function (freshers, fresher) {
                    var bool = true;
                    if (freshers && fresher) {
                        freshers.forEach(function (entry) {
                            if (entry.toUpperCase() === fresher.toUpperCase()) {
                                bool = false;
                            }
                        });
                    }
                    return bool;
                }
            };
        })

        .factory("User", function ($http, $location) {

            var user = null;
            $http.get("/DigiDay/php/router.php/user/me")
                    .success(function (data, status, headers, config) {
                        if (data.error) {
                            console.log(data);
                        } else {
                            user = data.user;
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    });
            return {
                create: function (newUser, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/create", {user: newUser})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    console.log(user);
                                    successCallback();
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                errorCallback();
                            });
                },
                login: function (logUser, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/login", {user: logUser})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    $http.get("/DigiDay/php/router.php/user/me")
                                            .success(function (data, status, headers, config) {
                                                if (data.error) {
                                                    console.log(data);
                                                    user = null;
                                                    errorCallback();
                                                } else {
                                                    user = data.user;
                                                    successCallback();
                                                }
                                            })
                                            .error(function (data, status, headers, config) {
                                                console.log(data);
                                                user = null;
                                                errorCallback();
                                            });
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                user = null;
                            });
                },
                logout: function () {
                    $http.get("/DigiDay/php/router.php/user/logout")
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                } else {
                                    $location.path("/");
                                    user = null;
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });
                },
                isAdministrator: function () {
                    if (user != null) {
                        if (user.administrator == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                },
                isAuthenticated: function () {
                    if (user != null) {
                        return true;
                    } else {
                        return false;
                    }
                },
                getUser: function () {
                    return user;
                },
                deleteUser: function (password, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/delete", {password: password})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    successCallback();
                                    $http.get("/DigiDay/php/router.php/user/logout")
                                            .success(function (data, status, headers, config) {
                                                if (data.error) {
                                                    console.log(data);
                                                } else {
                                                    user = null;
                                                }
                                            })
                                            .error(function (data, status, headers, config) {
                                                console.log(data);
                                            });
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                errorCallback();
                            });
                },
                updateEmail: function (email, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/email", {email: email})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    user.email = email;
                                    successCallback();
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                errorCallback();
                            });
                },
                updateImage: function (image, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/image", {image: image})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    user.image = image;
                                    successCallback();
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                errorCallback();
                            });
                },
                updatePassword: function (user, successCallback, errorCallback) {
                    $http.post("/DigiDay/php/router.php/user/password", {user: user})
                            .success(function (data, status, headers, config) {
                                if (data.error) {
                                    console.log(data);
                                    errorCallback();
                                } else {
                                    successCallback();
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                                errorCallback();
                            });
                }
            };
        })

        .factory("Utility", function () {
            return {
                stringToDate: function (string) {
                    var date = new Date(string);
                    date.setDate(date.getDate());
                    return date;
                }
            };
        });