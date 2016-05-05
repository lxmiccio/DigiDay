angular.module("CalendarMdl", [])

        .controller("CalendarCtrl", function ($http, $scope, $uibModal) {

            $scope.openSession = function (view, event) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: "lg",
                    templateUrl: view,
                    resolve: {
                        event: function () {
                            return event;
                        }
                    },
                    controller: function ($http, $location, $scope, $uibModalInstance, event) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss("cancel");
                        };

                        $scope.event = event;

                        $scope.stringToDate = function (stringDate) {
                            var date = new Date(stringDate);
                            date.setDate(date.getDate() + 1);
                            return date;
                        };
                    }
                });
            };

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
                            console.log(vm.events)
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };
            vm.getSessions();

            vm.calendarView = 'month';
            vm.viewDate = new Date();

            vm.eventClicked = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventEdited = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventDeleted = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.eventTimesChanged = function (event) {
                $scope.openSession("views/calendar/session.html", event);
                console.log(event);
            };

            vm.toggle = function ($event, field, event) {
                $scope.openSession("views/calendar/session.html", event);
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };
        });