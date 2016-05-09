angular.module("CalendarMdl", [])

        .controller("CalendarCtrl", function ($http, $scope, $uibModal) {

            $scope.openSession = function (view, event) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: "lg",
                    templateUrl: view,
                    resolve: {
                        event: function () {
                            return event;
                        },
                        events: function () {
                            return vm.events;
                        },
                        deleteSession: function () {
                            return vm.deleteSession;
                        }
                    },
                    controller: function ($http, $window, $scope, $uibModalInstance, User, event, events, deleteSession) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

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

                        $scope.User = User;

                        $scope.event = event;

                        $scope.events = events;

                        $scope.deleteSession = function () {
                            deleteSession($scope.event.id);
                            $scope.cancel();
                        };

                        $scope.isSubscribed = function () {
                            var boolean = false;
                            if (angular.isArray($scope.event.partecipants)) {
                                $scope.event.partecipants.forEach(function (entry) {
                                    if (entry != null) {
                                        if ($scope.User.getUser() != null) {
                                            if (entry.toUpperCase().toString() === $scope.User.getUser().fresher.toUpperCase().toString()) {
                                                boolean = true;
                                            }
                                        }
                                    }
                                });
                            }
                            return boolean;
                        };

                        $scope.isOwner = function () {
                            var boolean = false;
                            if ($scope.User.getUser() != null) {
                                if ($scope.event.creator.id.toUpperCase().toString() === $scope.User.getUser().fresher.toUpperCase().toString()) {
                                    boolean = true;
                                }
                            }
                            return boolean;
                        };

                        $scope.subscribe = function () {
                            $http.post("/DigiDay/php/router.php/session/subscribe", {sessionId: event.id})
                                    .success(function (data, status, headers, config) {
                                        if (data.error) {
                                            console.log(data);
                                        } else {
                                            console.log(data);
                                            $scope.event.partecipants.push($scope.User.getUser().fresher);
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };

                        $scope.unsubscribe = function () {
                            $http.post("/DigiDay/php/router.php/session/unsubscribe", {sessionId: event.id})
                                    .success(function (data, status, headers, config) {
                                        if (data.error) {
                                            console.log(data);
                                        } else {
                                            console.log(data);
                                            var array = angular.copy($scope.event.partecipants);
                                            $scope.event.partecipants = [];
                                            if (angular.isArray(array)) {
                                                array.forEach(function (entry) {
                                                    if (entry != null) {
                                                        if (entry.toUpperCase().toString() !== $scope.User.getUser().fresher) {
                                                            $scope.event.partecipants.push(entry);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log(data);
                                    });
                        };

                        $scope.stringToDate = function (stringDate) {
                            var date = new Date(stringDate);
                            date.setDate(date.getDate() + 1);
                            return date;
                        };
                    }
                });
            };

            var vm = this;

            vm.allEvents = [];
            vm.events = [];

            vm.filter = function (topic) {
                if (topic === 0) {
                    vm.events = vm.allEvents;
                } else {
                    if (angular.isArray(vm.allEvents)) {
                        vm.events = [];
                        vm.allEvents.forEach(function (entry) {
                            if (entry.topic.id === topic) {
                                vm.events.push(entry);
                            }
                        });
                    }
                }
            };

            vm.topics = [];

            vm.getTopics = function () {
                var topic = {
                    id: 0,
                    scope: "Tutto"
                };
                $http.get("/DigiDay/php/router.php/topics")
                        .success(function (data, status, headers, config) {
                            if (Array.isArray(data.topics)) {
                                vm.topics.push(topic);
                                data.topics.forEach(function (entry) {
                                    vm.topics.push(entry);
                                });
                                vm.filter(topic.id);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
                $scope.topic = topic;
            };

            vm.getTopics();

            vm.deleteSession = function (sessionId) {
                $http.post("/DigiDay/php/router.php/delete/session", {sessionId: sessionId})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                console.log(data);
                                var array = angular.copy(vm.events);
                                vm.events = [];
                                if (angular.isArray(array)) {
                                    array.forEach(function (entry) {
                                        if (entry != null) {
                                            if (entry.id.toUpperCase().toString() !== sessionId.toUpperCase().toString()) {
                                                vm.events.push(entry);
                                            }
                                        }
                                    });
                                }
                            }
                            //$window.location.reload();
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.getSessions = function () {
                $http.get("/DigiDay/php/router.php/sessions/calendar")
                        .success(function (data, status, headers, config) {
                            console.log(data)
                            if (Array.isArray(data.sessions)) {
                                data.sessions.forEach(function (entry) {
                                    entry.startsAt = new Date(entry.startsAt);
                                    entry.endsAt = new Date(entry.endsAt);
                                    vm.allEvents.push(entry);
                                });
                            }
                            console.log(vm.events)
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };
            vm.getSessions();

            vm.calendarView = 'month';
            vm.viewDate = new Date();

            vm.eventClicked = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventEdited = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventDeleted = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventTimesChanged = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.toggle = function ($event, field, event) {
                $scope.openSession("views/calendar/session.html", event);
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };
        })

        .filter("topic", function () {
            return function (sessions, topic) {

                return sessions;
            };
        });