angular.module("DigiDayMdl", ["ngRoute", "ui.bootstrap", "AdministratorMdl", "CalendarMdl", "LoginMdl", "RegistrationMdl", "SessionMdl", "TakePartMdl", "UserMdl"])

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
            templateUrl: "views/session.html"
        });
        $routeProvider.when("/sessione/iscriviti", {
            templateUrl: "views/takePart.html"
        });

    }])
    
    .factory("Form", function () {
        return {
            isExistingClassroom: function(classrooms, classroom) {
                var bool = false;
                if(classroom && classroom.name) {
                    classrooms.forEach(function (entry) {
                        if (entry.name.toUpperCase() === classroom.name.toUpperCase()) {
                            bool = true;
                        }
                    });
                }
                return bool;
            },
            isInvalidCapacity: function(classroom) {
                var bool = true;
                if(classroom && classroom.capacity) {
                    if(classroom.capacity.match(/^[0-9]+$/)) {
                        if(classroom.capacity >= 10 && classroom.capacity <= 50) {
                            bool = false;
                        }
                    }
                }
                return bool;
            }
        };
    });