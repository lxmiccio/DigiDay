angular.module("CalendarMdl", [])

        .controller("CalendarCtrl", function ($http, $scope) {

            var vm = this;

            vm.events = [];

            vm.getSessions = function () {
                $http.get("/DigiDay/php/router.php/sessions/calendar")
                        .success(function (data, status, headers, config) {
                            if (Array.isArray(data.sessions)) {
                                data.sessions.forEach(function (entry) {
                                    entry.startsAt = new Date(entry.startsAt);
                                    entry.endsAt = new Date(entry.endsAt);
                                    vm.events.push(entry);
                                });
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };
            vm.getSessions();

            vm.calendarView = 'month';
            vm.viewDate = new Date();

            vm.eventClicked = function (event) {
                console.log(event);
            };

            vm.eventEdited = function (event) {
                console.log(event);
            };

            vm.eventDeleted = function (event) {
                console.log(event);
            };

            vm.eventTimesChanged = function (event) {
                console.log(event);
            };

            vm.toggle = function ($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };
        });