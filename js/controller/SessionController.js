angular.module("SessionMdl", [])

        .controller("SessionCtrl", function ($http, Form) {

            var vm = this;

            vm.Form = Form;

            vm.classrooms = [];

            vm.getClassrooms = function () {
                $http.get("/DigiDay/php/router.php/classrooms")
                        .success(function (data, status, headers, config) {
                            if (Array.isArray(data.classrooms)) {
                                data.classrooms.forEach(function (entry) {
                                    vm.classrooms.push(entry);
                                });
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.getClassrooms();

            vm.items = [];

            vm.getItems = function () {
                $http.get("/DigiDay/php/router.php/items")
                        .success(function (data, status, headers, config) {
                            if (Array.isArray(data.items)) {
                                data.items.forEach(function (entry) {
                                    vm.items.push(entry);
                                });
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.getItems();

            vm.topics = [];

            vm.getTopics = function () {
                $http.get("/DigiDay/php/router.php/topics")
                        .success(function (data, status, headers, config) {
                            if (Array.isArray(data.topics)) {
                                data.topics.forEach(function (entry) {
                                    vm.topics.push(entry);
                                });
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };

            vm.getTopics();

            vm.createSession = function (session) {
                console.log(session);
                $http.post("/DigiDay/php/router.php/session/create", {session: session})
                        .success(function (data, status, headers, config) {
                            if (data.error) {
                                console.log(data);
                            } else {
                                console.log(data);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(data);
                        });
            };
        })

        .filter("available", function () {
            return function (classrooms, startingDate, endingDate) {
                if (angular.isArray(classrooms)) {
                    var array = [];
                    classrooms.forEach(function (entry) {
                        if (entry.sessions === null) {
                            array.push(entry);
                        } else {
                            var free = true;
                            entry.sessions.forEach(function (session) {
                                if ((!(startingDate < session.startingDate)) && (!(startingDate > session.endingDate))
                                        || (!(session.startingDate < startingDate)) && (!(session.startingDate > endingDate))
                                        || (!(endingDate < session.startingDate)) && (!(endingDate > session.endingDate))
                                        || (!(session.endingDate < startingDate)) && (!(session.endingDate > endingDate))) {
                                    free = false;
                                }
                            });
                            if (free) {
                                array.push(entry);
                            }
                        }
                    });
                    return array;
                } else {
                    return classrooms;
                }
            };
        });