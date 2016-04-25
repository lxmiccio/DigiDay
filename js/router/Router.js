angular.module("RouterMdl", ["ngRoute", "AdministratorMdl", "CalendarMdl", "LoginMdl", "RegistrationMdl", "SessionMdl", "TakePartMdl", "UserMdl", "UserProfileMdl"])

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
        $routeProvider.when("/amministratore/inserisci/aula", {
            templateUrl: "views/administrator/createClassroom.html"
        });
        $routeProvider.when("/amministratore/inserisci/materiale", {
            templateUrl: "views/administrator/createItem.html"
        });
        $routeProvider.when("/amministratore/inserisci/argomento", {
            templateUrl: "views/administrator/createTopic.html"
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
        $routeProvider.when("/sessione/crea", {
            templateUrl: "views/session.html"
        });
        $routeProvider.when("/sessione/iscriviti", {
            templateUrl: "views/takePart.html"
        });

    }]);