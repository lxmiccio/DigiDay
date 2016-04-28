angular.module("RouterMdl", ["ngRoute", "ui.bootstrap", "AdministratorMdl", "CalendarMdl", "LoginMdl", "RegistrationMdl", "SessionMdl", "TakePartMdl", "UserMdl", "UserProfileMdl"])

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
        $routeProvider.when("/amministratore", {
            templateUrl: "views/administrator/administrator.html"
        });
        $routeProvider.when("/amministratore/inserisci/aula", {
            templateUrl: "views/administrator/create/classroom.html"
        });
        $routeProvider.when("/amministratore/inserisci/materiale", {
            templateUrl: "views/administrator/create/item.html"
        });
        $routeProvider.when("/amministratore/inserisci/argomento", {
            templateUrl: "views/administrator/create/topic.html"
        });
        $routeProvider.when("/amministratore/cancella/aula", {
            templateUrl: "views/administrator/delete/classroom.html"
        });
        $routeProvider.when("/amministratore/cancella/materiale", {
            templateUrl: "views/administrator/delete/item.html"
        });
        $routeProvider.when("/amministratore/cancella/argomento", {
            templateUrl: "views/administrator/delete/topic.html"
        });
        $routeProvider.when("/amministratore/modifica/aula", {
            templateUrl: "views/administrator/update/classroom.html"
        });
        $routeProvider.when("/amministratore/modifica/materiale", {
            templateUrl: "views/administrator/update/item.html"
        });
        $routeProvider.when("/amministratore/modifica/argomento", {
            templateUrl: "views/administrator/update/topic.html"
        });
        $routeProvider.when("/utente", {
            templateUrl: "views/user/user.html"
        });
        $routeProvider.when("/utente/modifica/email", {
            templateUrl: "views/user/changeEmail.html"
        });
        $routeProvider.when("/utente/modifica/password", {
            templateUrl: "views/user/changePassword.html"
        });
        $routeProvider.when("/utente/modifica/immagine", {
            templateUrl: "views/user/changePhoto.html"
        });
        $routeProvider.when("/utente/elimina", {
            templateUrl: "views/user/deleteUser.html"
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

    }]);