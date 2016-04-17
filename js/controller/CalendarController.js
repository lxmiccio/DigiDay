angular.module("CalendarMdl", [])

    .controller("CalendarCtrl", function ($http) {

        var vm = this;

        vm.sessions = [];
        
        vm.getSessions = function(){
            $http.get("php/router.php/sessions/calendar")
                .then(
                    function (json) {
                        if (!json.data.error) {
                            json.data.calendar.forEach(function (entry) {
                                vm.sessions.push(entry);
                            });
                        $("#calendar").fullCalendar("addEventSource", vm.sessions);
                        } else {
                            console.log(json.data);
                        }
                    }, function (json) {
                        console.log(json.data);
                    }
                );
        };

        vm.getSessions();

    });