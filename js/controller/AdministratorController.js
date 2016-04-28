angular.module("AdministratorMdl", [])

    .controller("AdministratorCtrl", function ($http) {

        var vm = this;

        vm.classrooms = [];

        vm.getClassrooms = function () {
            $http.get("/DigiDay/php/router.php/classrooms")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.classrooms)) {
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
            if(vm.classroom.name) {
                vm.classrooms.forEach(function (entry) {
                    if (entry.name.toUpperCase() === vm.classroom.name.toUpperCase()) {
                        bool = true;
                    }
                });
            }
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
            $http.post("/StartUp/php/router.php/administrator/create/classroom", {classroom: vm.classroom})
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

        vm.deleteClassroom = function (id) {
            $http.post("/StartUp/php/router.php/administrator/delete/classroom", {id: id})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.classrooms;
                        vm.classrooms = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== id) {
                                    vm.classrooms.push(entry);
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.updateClassroom = function () {
            $http.post("/DigiDay/php/router.php/administrator/update/classroom", {classroom: vm.classroom})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.classrooms)) {
                            vm.classrooms.forEach(function (entry, index) {
                                if(entry.id === vm.classroom.id) {
                                    vm.classrooms[index].name = vm.classroom.name;
                                    vm.classrooms[index].capacity = vm.classroom.capacity;
                                    vm.classrooms[index].features = vm.classroom.features;
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.items = [];

        vm.getItems = function () {
            $http.get("/DigiDay/php/router.php/items")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.items)) {
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
            $http.post("/DigiDay/php/router.php/administrator/create/item", {item: vm.item})
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

        vm.deleteItem = function (id) {
            $http.post("/DigiDay/php/router.php/administrator/delete/item", {id: id})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.items;
                        vm.items = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== id) {
                                    vm.items.push(entry);
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.updateItem = function () {
            $http.post("/DigiDay/php/router.php/administrator/update/item", {item: vm.item})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.items)) {
                            vm.items.forEach(function (entry, index) {
                                if(entry.id === vm.item.id) {
                                    vm.items[index].name = vm.item.name;
                                    vm.items[index].description = vm.item.description;
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.topics = [];

        vm.getTopics = function () {
            $http.get("/DigiDay/php/router.php/topics")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.topics)) {
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
            $http.post("/DigiDay/php/router.php/administrator/create/topic", {topic: vm.topic})
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

        vm.deleteTopic = function (id) {
            $http.post("/DigiDay/php/router.php/administrator/delete/topic", {id: id})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.topics;
                        vm.topics = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== id) {
                                    vm.topics.push(entry);
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.updateTopic = function () {
            $http.post("/DigiDay/php/router.php/administrator/update/topic", {topic: vm.topic})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.items)) {
                            vm.topics.forEach(function (entry, index) {
                                if(entry.id === vm.topic.id) {
                                    vm.topics[index].name = vm.topic.name;
                                    vm.topics[index].description = vm.topic.description;
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

    });