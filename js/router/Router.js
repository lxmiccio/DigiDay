angular.module("DigiDayMdl", ["ngRoute", "mwl.calendar", "nya.bootstrap.select", "ui.bootstrap", "AdministratorMdl", "CalendarMdl", "SessionMdl", "TakePartMdl", "UserMdl"])

        .config(["$routeProvider", function ($routeProvider) {

                $routeProvider.when("/", {
                    templateUrl: "views/calendar.html"
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

            }])

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
                    console.log(maximumPartecipants)
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
        });