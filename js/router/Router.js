angular.module("RouterMdl", ["ngRoute", "LoginMdl", "RegistrationMdl", "SessionMdl"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "views/home.html"
        });
        $routeProvider.when("/accedi", {
            templateUrl: "views/accedi.html"
        });
        $routeProvider.when("/registrazione", {
            templateUrl: "views/registrazione.html"
        });
    }]);