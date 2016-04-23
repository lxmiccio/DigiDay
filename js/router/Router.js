angular.module("RouterMdl", ["ngRoute", "UserMdl", "CalendarMdl", "LoginMdl", "PartecipaMdl", "RegistrationMdl", "SessionMdl"])

    .config(['$routeProvider', function ($routeProvider) {
    
        $routeProvider.when("/", {
            templateUrl: "views/calendar.html"
        });
        $routeProvider.when("/accedi", {
            templateUrl: "views/login.html"
        });
        $routeProvider.when("/registrati", {
            templateUrl: "views/registration.html"
        });
        $routeProvider.when("/sessione/crea", {
            templateUrl: "views/session.html"
        });
        $routeProvider.when("/sessione/iscriviti", {
            templateUrl: "views/partecipa.html"
        });

    }]);