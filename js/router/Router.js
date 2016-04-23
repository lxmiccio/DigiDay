angular.module("RouterMdl", ["ngRoute", "CalendarMdl", "LoginMdl", "PartecipaMdl", "RegistrationMdl", "SessionMdl"])
    
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

    }]);/*
        
    .controller("PartecipaCtrl", function ($http) {

        var vm = this;

        var sessions = [];

        vm.getSessions = function () {
            $http.get("/StartUp/php/router.php/sessions")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.data.sessions.forEach(function (entry) {
                                vm.sessions.push(entry);
                            });
                        } else {
                            console.log(json);
                        }
                    }, function (json){
                        console.log(json);
                    }
                );
        };

        vm.getSessions();

    });
    */