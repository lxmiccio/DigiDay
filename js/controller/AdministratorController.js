angular.module("AdministratorMdl", [])

    .controller("AdministratorCtrl", function ($http) {

        var vm = this;

        vm.classrooms = [];

        vm.getClassrooms = function () {
            $http.get("/StartUp/php/router.php/classrooms")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.freshers)) {
                        data.classrooms.forEach(function (entry) {
                            vm.classrooms.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        vm.getClassrooms();

        vm.classroom = {};

        vm.isExistingClassroom = function () {
            var bool = false;
            vm.classrooms.forEach(function (entry) {
                if (entry.toUpperCase() === vm.classroom.id.toUpperCase()) {
                    bool = true;
                }
            });
            return bool;
        };

        vm.checkCapacity = function () {
            if(vm.classroom.capacity < 10 || vm.classroom.capacity > 50) {
                return true;
            } else {
                return false;
            }
        };

        vm.createClassroom = function () {
            $http.post("/StartUp/php/router.php/administrator/classroom", {classroom: vm.classroom})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        console.log(data);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.items = [];

        vm.getItems = function () {
            $http.get("/StartUp/php/router.php/items")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.freshers)) {
                        data.items.forEach(function (entry) {
                            vm.items.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        vm.getItems();

        vm.item = {};

        vm.createItem = function () {
            $http.post("/StartUp/php/router.php/administrator/item", {item: vm.item})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        console.log(data);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.topics = [];

        vm.getTopics = function () {
            $http.get("/StartUp/php/router.php/topics")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.freshers)) {
                        data.topics.forEach(function (entry) {
                            vm.topics.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };
        vm.getTopics();

        vm.topic = {};

        vm.createTopic = function () {
            $http.post("/StartUp/php/router.php/administrator/topic", {topic: vm.topic})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        console.log(data);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

    });