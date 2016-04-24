angular.module("SessionMdl", [])

        .controller("SessionCtrl", function ($http, $scope, $timeout) {

            var vm = this;

            vm.classrooms = [];

            vm.getClassrooms = function () {
                $http.get("/StartUp/php/router.php/classrooms")
                        .then(
                                function (json) {
                                    if (!json.error) {
                                        json.data.classrooms.forEach(function (entry) {
                                            vm.classrooms.push(entry);
                                        });
                                    } else {
                                        console.log(json);
                                    }
                                }, function (json) {
                            console.log(json);
                        }
                        );
            };

            vm.getClassrooms();

            vm.refreshClassrooms = function () {
                var html = "";
                vm.classrooms.forEach(function (entry) {
                    if (entry.sessions === null) {
                        html += "<option value=\"" + entry.classroom + "\">" + entry.classroom + "</option>";
                    } else {
                        var free = true;
                        entry.sessions.forEach(function (session) {
                            if ((vm.session.startingDate >= session.startingDate) && (vm.session.startingDate <= session.endingDate)
                                    || (session.startingDate >= vm.session.startingDate) && (!session.startingDate <= vm.session.endingDate)
                                    || (vm.session.endingDate >= session.startingDate) && (!vm.session.endingDate <= session.endingDate)
                                    || (session.endingDate >= vm.session.startingDate) && (!session.endingDate <= vm.session.endingDate)) {
                                free = false;
                            }
                        });
                        if (free) {
                            html += "<option value=\"" + entry.classroom + "\">" + entry.classroom + "</option>";
                        }
                    }
                });
                $("#InputClassroom").html(html).removeAttr("disabled").selectpicker("refresh");
            };

            vm.items = [];

            vm.getItems = function () {
                $http.get("/StartUp/php/router.php/items")
                        .then(
                                function (json) {
                                    if (!json.error) {
                                        json.data.items.forEach(function (entry) {
                                            vm.items.push(entry);
                                        });
                                    } else {
                                        console.log(json);
                                    }
                                }, function (json) {
                            console.log(json);
                        }
                        );
            };

            vm.getItems();

            vm.refreshItems = function () {
                var html = "";
                vm.items.forEach(function (entry) {
                    if (entry.sessions === null) {
                        html += "<option value=\"" + entry.item + "\">" + entry.name + "</option>";
                    } else {
                        var free = true;
                        entry.sessions.forEach(function (session) {
                            if ((vm.session.startingDate >= session.startingDate) && (vm.session.startingDate <= session.endingDate)
                                    || (session.startingDate >= vm.session.startingDate) && (!session.startingDate <= vm.session.endingDate)
                                    || (vm.session.endingDate >= session.startingDate) && (!vm.session.endingDate <= session.endingDate)
                                    || (session.endingDate >= vm.session.startingDate) && (!session.endingDate <= vm.session.endingDate)) {
                                free = false;
                            }
                        });
                        if (free) {
                            html += "<option value=\"" + entry.item + "\">" + entry.name + "</option>";
                        }
                    }
                });
                console.log(html);
                $("#InputItems").html(html).removeAttr("disabled").selectpicker("refresh");
            };

            vm.sessions = [];

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
                                }, function (json) {
                            console.log(json);
                        }
                        );
            };

            vm.getSessions();

            vm.topics = [];

            vm.getTopics = function () {
                $http.get("/StartUp/php/router.php/topics")
                        .then(
                                function (json) {
                                    if (!json.error) {
                                        json.data.topics.forEach(function (entry) {
                                            vm.topics.push(entry);
                                        });

                                        var html = "";
                                        vm.topics.forEach(function (entry) {
                                            html += "<option value=\"" + entry.topic + "\">" + entry.topic + "</option>";
                                        });
                                        $("#InputTopic").html(html).selectpicker("refresh");

                                    } else {
                                        console.log(json);
                                    }
                                }, function (json) {
                            console.log(json);
                        }
                        );
            };

            vm.getTopics();

            vm.refreshMaxPartecipants = function () {
                var html = "";
                vm.classrooms.forEach(function (entry) {
                    console.log(entry.classroom);
                    console.log(vm.session.classroom);
                    if (entry.classroom === vm.session.classroom) {
                        for (var i = 3; i <= entry.capacity; i++) {
                            html += "<option value=\"" + i + "\">" + i + "</option>";
                        }
                    }
                });
                $("#InputMaxPartecipants").html(html).removeAttr("disabled").selectpicker("refresh");
            };

            vm.session = {};

            vm.session.details = "";

            vm.onStartingDateChange = function () {
                vm.session.endingDate = "";
                vm.session.classroom = "";
                vm.session.maxPartecipants = "";
                $("#InputClassroom").attr("disabled", "disabled").selectpicker("val", null).selectpicker("refresh");
                $("#InputMaxPartecipants").attr("disabled", "disabled").selectpicker("val", null).selectpicker("refresh");
                $("#InputItems").attr("disabled", "disabled").selectpicker("val", null).selectpicker("refresh");
            };

            vm.onEndingDateChange = function () {
                vm.refreshClassrooms();
                vm.refreshItems();
                vm.session.classroom = "";
                vm.session.maxPartecipants = "";
                $("#InputClassroom").selectpicker("val", null).selectpicker("refresh");
                $("#InputMaxPartecipants").attr("disabled", "disabled").selectpicker("val", null).selectpicker("refresh");
                $("#InputMaxPartecipants").attr("disabled", "disabled").selectpicker("val", null).selectpicker("refresh");
            };

            vm.onClassroomChange = function () {
                vm.refreshMaxPartecipants();
            };

            vm.session.maxPartecipants = null;

            vm.decreaseMaxPartecipants = function () {
                if (vm.session.maxPartecipants > 3) {
                    vm.session.maxPartecipants--;
                }
            };

            vm.increaseMaxPartecipants = function () {
                if (vm.session.maxPartecipants < 25) {
                    vm.session.maxPartecipants++;
                }
            };

            vm.createSession = function () {
                $http.post("/StartUp/php/router.php/session/create", {session: vm.session})
                        .then(
                                function (data) {
                                    console.log(data);
                                }, function (data) {
                            console.log(data);
                        }
                        );
            };
        });