angular.module("SessionMdl", [])

    .controller("SessionCtrl", function ($http) {

        var vm = this;

        vm.allClassrooms = [];

        vm.getAllClassrooms = function () {
            $http.get("php/router.php/classrooms")
                .then(
                    function (json){
                        if (!json.error) {
                            json.classrooms.forEach(function (entry) {
                                vm.allClassrooms.push(entry);
                            });
                        } else {
                            console.log(json);
                        }
                    }, function (json){
                        console.log(json);
                    }
                );
        };
        
        vm.getAllClassrooms();

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
                                || (session.endingDate >= vm.newSession.startingDate) && (!session.endingDate <= vm.newSession.endingDate)) {
                            free = false;
                        }
                    });
                    if (free) {
                        vm.classrooms.push(entry);
                    }
                }
            });
        };

        vm.items = [];

        vm.getItems = function () {
            $http.get("php/router.php/items")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.items.forEach(function (entry) {
                                vm.items.push(entry);
                            });
                        } else {
                            console.log(json);
                        }
                    }, function (json){
                        console.log(json);
                    }
                );
        };
        
        vm.getItems();

        vm.sessions = [];

        vm.getSessions = function () {
            $http.get("php/router.php/sessions")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.sessions.forEach(function (entry) {
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

        vm.topics = [];

        vm.getTopics = function () {
            $http.get("php/router.php/topics")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.topics.forEach(function (entry) {
                                vm.topics.push(entry);
                            });
                        } else {
                            console.log(json);
                        }
                    }, function (json){
                        console.log(json);
                    }
                );
        };
        
        vm.getTopics();

        vm.newSession = {};
        vm.newSession.maxPartecipants = 20;

        vm.decreaseMaxPartecipants = function () {
            if (vm.newSession.maxPartecipants > 3) {
                vm.newSession.maxPartecipants--;
            }
        };

        vm.increaseMaxPartecipants = function () {
            if (vm.newSession.maxPartecipants < 25) {
                vm.newSession.maxPartecipants++;
            }
        };

        vm.createSession = function () {
            $http.post("php/router.php/session/create", {session: vm.session})
                .then(
                    function (data) {
                        console.log(data);
                    }, function (data) {
                        console.log(data);
                    }
                );
            };

        });