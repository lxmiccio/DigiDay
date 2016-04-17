angular.module("SessionMdl", [])

    .controller("SessionCtrl", function ($http) {

        var vm = this;

        vm.allClassrooms = [];

        vm.getAllClassrooms = function () {
            $http.get("php/router.php/classrooms")
                .then(
                    function (json){
                        if (!json.error) {
                            json.data.classrooms.forEach(function (entry) {
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
                        if ((vm.session.startingDate >= session.startingDate) && (vm.session.startingDate <= session.endingDate)
                                || (session.startingDate >= vm.session.startingDate) && (!session.startingDate <= vm.session.endingDate)
                                || (vm.session.endingDate >= session.startingDate) && (!vm.session.endingDate <= session.endingDate)
                                || (session.endingDate >= vm.session.startingDate) && (!session.endingDate <= vm.session.endingDate)) {
                            free = false;
                        }
                    });
                    if (free) {
                        vm.classrooms.push(entry);
                    }
                }
            });
        };

        vm.allItems = [];

        vm.getItems = function () {
            $http.get("php/router.php/items")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.data.items.forEach(function (entry) {
                                vm.allItems.push(entry);
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

        vm.items = [];

        vm.refreshItems = function () {
            vm.items = [];
            vm.allItems.forEach(function (entry) {
                if (entry.sessions === null) {
                    vm.items.push(entry);
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
                        vm.items.push(entry);
                    }
                }
            });
        };

        vm.sessions = [];

        vm.getSessions = function () {
            $http.get("php/router.php/sessions")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.data.sessions.forEach(function (entry) {
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
                            json.data.topics.forEach(function (entry) {
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

        vm.session = {};
        vm.session.maxPartecipants = 20;

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