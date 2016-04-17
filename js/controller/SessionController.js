angular.module("SessionMdl", [])
        .controller("SessionCtrl", function ($http) {

            var vm = this;

            vm.allClassrooms = [];
            $http.get("http://localhost/StartUp/php/router.php/classrooms").success(function (data) {
                console.log(data);
                if (!data.error) {
                    data.classrooms.forEach(function (entry) {
                        vm.allClassrooms.push(entry);
                    });
                } else {
                    console.log(data);
                }
            }).error(function (data) {
                console.log(data);
            });

            vm.classrooms = [];
            vm.refreshClassrooms = function () {
                vm.classrooms = [];
                vm.allClassrooms.forEach(function (entry) {
                    if (entry.sessions === null) {
                        vm.classrooms.push(entry);
                    } else {
                        var free = true;
                        entry.sessions.forEach(function (session) {
                            console.log(vm.newSession.startingDate);
                            console.log(session.startingDate);
                            if ((vm.newSession.startingDate >= session.startingDate) && (vm.newSession.startingDate <= session.endingDate)
                                    || (session.startingDate >= vm.newSession.startingDate) && (!session.startingDate <= vm.newSession.endingDate)
                                    || (vm.newSession.endingDate >= session.startingDate) && (!vm.newSession.endingDate <= session.endingDate)
                                    || (session.endingDate >= vm.newSession.startingDate) && (!session.endingDate <= vm.newSession.endingDate))
                                free = false;
                        });
                        if (free) {
                            vm.classrooms.push(entry);
                        }
                    }
                });
                console.log(vm.classrooms);
            }

            vm.items = [];
            $http.get("http://localhost/StartUp/php/router.php/items").success(function (data) {
                if (!data.error) {
                    data.items.forEach(function (entry) {
                        vm.items.push(entry);
                    });
                } else {
                    console.log(data);
                }
            }).error(function (data) {
                console.log(data);
            });

            vm.sessions = [];
            $http.get("http://localhost/StartUp/php/router.php/sessions").success(function (data) {
                if (!data.error) {
                    data.data.forEach(function (entry) {
                        vm.sessions.push(entry);
                    });
                } else {
                    console.log(data);
                }
            }).error(function (error) {
                console.log(error);
            });

            vm.topics = [];
            $http.get("http://localhost/StartUp/php/router.php/topics").success(function (data) {
                if (!data.error) {
                    data.topics.forEach(function (entry) {
                        vm.topics.push(entry);
                    });
                } else {
                    console.log(data);
                }
            }).error(function (data) {
                console.log(data);
            });



            vm.newSession = {};

            vm.newSession.maxPartecipants = 20;
            vm.decreaseMaxPartecipants = function () {
                if (vm.newSession.maxPartecipants > 3) {
                    vm.newSession.maxPartecipants--;
                }
            }
            vm.increaseMaxPartecipants = function () {
                if (vm.newSession.maxPartecipants < 25) {
                    vm.newSession.maxPartecipants++;
                }
            }

            vm.createSession = function () {
                $http.post('http://localhost/StartUp/php/router.php/session/create', {session: vm.session})
                        .then(function (data) {
                            console.log(data);
                        }, function (data) {
                            console.log(data);
                        });
            };
        });