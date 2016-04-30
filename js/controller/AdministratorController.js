angular.module("AdministratorMdl", [])

    .controller("AdministratorCtrl", function ($http, $scope, $uibModal, Form) {

        $scope.open = function (view) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: "lg",
                templateUrl: view
            });
        };

        var vm = this;
        
        vm.Form = Form;

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

        vm.createClassroom = function (classroom) {
            console.log(classroom);
            $http.post("/DigiDay/php/router.php/administrator/create/classroom", {classroom: classroom})
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

        vm.deleteClassroom = function (classroom) {
            console.log(classroom);
            $http.post("/DigiDay/php/router.php/administrator/delete/classroom", {classroom: classroom})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.classrooms;
                        vm.classrooms = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== classroom.id) {
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

        vm.updateClassroom = function (classroom) {
            $http.post("/DigiDay/php/router.php/administrator/update/classroom", {classroom: classroom})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.classrooms)) {
                            vm.classrooms.forEach(function (entry, index) {
                                if(entry.id === classroom.id) {
                                    vm.classrooms[index].name = classroom.name;
                                    vm.classrooms[index].capacity = classroom.capacity;
                                    vm.classrooms[index].features = classroom.features;
                                    vm.temporary.classroom.name = classroom.name;
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

        vm.createItem = function (item) {
            console.log(item);
            $http.post("/DigiDay/php/router.php/administrator/create/item", {item: item})
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

        vm.deleteItem = function (item) {
            $http.post("/DigiDay/php/router.php/administrator/delete/item", {item: item})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.items;
                        vm.items = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== item.id) {
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

        vm.updateItem = function (item) {
            console.log(item)
            $http.post("/DigiDay/php/router.php/administrator/update/item", {item: item})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.items)) {
                            vm.items.forEach(function (entry, index) {
                                if(entry.id === item.id) {
                                    vm.items[index].name = item.name;
                                    vm.items[index].description = item.description;
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

        vm.createTopic = function (topic) {
            console.log(topic);
            $http.post("/DigiDay/php/router.php/administrator/create/topic", {topic: topic})
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

        vm.deleteTopic = function (topic) {
            var bool = false;
            $http.post("/DigiDay/php/router.php/administrator/delete/topic", {topic: topic})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        var array = vm.topics;
                        vm.topics = [];
                        if (Array.isArray(array)) {
                            array.forEach(function (entry) {
                                if(entry.id !== topic.id) {
                                    vm.topics.push(entry);
                                }
                            });
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
            return bool;
        };

        vm.updateTopic = function (topic) {
            $http.post("/DigiDay/php/router.php/administrator/update/topic", {topic: topic})
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        if (Array.isArray(vm.topics)) {
                            vm.topics.forEach(function (entry, index) {
                                if(entry.id === topic.id) {
                                    vm.topics[index].scope = topic.scope;
                                    vm.topics[index].description = topic.description;
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