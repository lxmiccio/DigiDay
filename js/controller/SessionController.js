angular.module("SessionMdl", [])
    .controller("SessionCtrl", function ($http) {

        var vm = this;

        vm.sessions = [];
        $http.get("http://localhost/StartUp/php/router.php/sessions").success(function (data) {
            data.forEach(function (entry) {
                vm.sessions.push(entry);
            });
            $('#calendar').fullCalendar('addEventSource', vm.sessions);
        }).error(function (error) {
            console.log(error);
        });

    });