angular.module("RouterMdl", ["ngRoute", "LoginMdl", "RegistrationMdl", "CalendarMdl", "SessionMdl", "ui.calendar"])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when("/", {
                    templateUrl: "views/calendar.html"
                });
                $routeProvider.when("/accedi", {
                    templateUrl: "views/login.html"
                });
                $routeProvider.when("/registrati", {
                    templateUrl: "views/registrati.html"
                });
                $routeProvider.when("/sessione", {
                    templateUrl: "views/sessione.html"
                });
                $routeProvider.when("/creasessione", {
                    templateUrl: "views/sessione.html"
                });
            }]);