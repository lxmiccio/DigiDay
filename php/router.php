<?php

require_once ".." . DIRECTORY_SEPARATOR . "libraries" . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

$router = new Phroute\Phroute\RouteCollector();


/**
 * Returns all the sessions to print them into the calendar
 */
$router->get("StartUp/php/router.php/sessions/calendar", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS maxNumber, Dettagli AS details FROM Sessione") as $row) {
            $array[] = array(
                "title" => $row["title"],
                "start" => str_replace(" ", "T", $row["startingDate"]) . "Z",
                "end" => str_replace(" ", "T", $row["endingDate"]) . "Z"
            );
        }
        echo json_encode(array(
            "error" => false,
            "calendar" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Returns all the freshers
 */
$router->get("StartUp/php/router.php/freshers", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Matricola AS fresher FROM Utente") as $row) {
            $array[] = $row["fresher"];
        }
        echo json_encode(array(
            "error" => false,
            "freshers" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Returns all the emails
 */
$router->get("StartUp/php/router.php/emails", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Email AS email FROM Utente") as $row) {
            $array[] = $row["email"];
        }
        echo json_encode(array(
            "error" => false,
            "emails" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});



/*
 * Returns all the classrooms including the sessions from which they are required
 */
$router->get("StartUp/php/router.php/classrooms", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Aula.IdAula AS classroom, Capienza AS capacity, Caratteristiche AS features, DataInizio AS startingDate, DataFine AS endingDate FROM Aula LEFT OUTER JOIN Sessione ON Aula.IdAula = Sessione.IdAula") as $row) {
            $added = false;
            foreach ($array as &$object) {
                if ($object["classroom"] == $row["classroom"]) {
                    $added = true;
                    $object["sessions"][] = array(
                        "startingDate" => $row["startingDate"],
                        "endingDate" => $row["endingDate"]
                    );
                }
            }
            if (!$added) {
                if (isset($row["startingDate"]) || isset($row["endingDate"])) {
                    $array[] = array(
                        "classroom" => $row["classroom"],
                        "capacity" => $row["capacity"],
                        "features" => $row["features"],
                        "sessions" => array(
                            array(
                                "startingDate" => $row["startingDate"],
                                "endingDate" => $row["endingDate"]
                            )
                        )
                    );
                } else {
                    $array[] = array(
                        "classroom" => $row["classroom"],
                        "capacity" => $row["capacity"],
                        "features" => $row["features"],
                        "sessions" => null
                    );
                }
            }
        }
        echo json_encode(array(
            "error" => false,
            "classrooms" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Returns all the items including the sessions from which they are required
 * TO COMPLETE
 */
$router->get("StartUp/php/router.php/items", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Nome AS name, Descrizione AS description FROM Materiale") as $row) {
            $array[] = array(
                "name" => $row["name"],
                "description" => $row["description"]
            );
        }
        echo json_encode(array(
            "error" => false,
            "items" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Returns all the topics
 */
$router->get("StartUp/php/router.php/topics", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Ambito AS topic, Descrizione AS description FROM Argomento") as $row) {
            $array[] = array(
                "topic" => $row["topic"],
                "details" => $row["description"]
            );
        }
        echo json_encode(array(
            "error" => false,
            "topics" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});



/**
 * Creates a session
 * TO COMPLETE
 */
$router->post("StartUp/php/router.php/session/create", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    $title = filter_var($json->session->fresher, FILTER_SANITIZE_STRING);
    $password = crypt($json->session->password, "$2y$10$" . substr(md5(uniqid(rand(), true)), 0, 22));
    $firstName = filter_var($json->session->firstName, FILTER_SANITIZE_STRING);
    $lastName = filter_var($json->session->lastName, FILTER_SANITIZE_STRING);
    $email = filter_var($json->session->email, FILTER_SANITIZE_EMAIL);
    $birthdate = date("Y-m-d", strtotime(filter_var($json->session->birthdate, FILTER_SANITIZE_STRING)));
    $role = filter_var($json->session->role);
    $sex = filter_var($json->session->sex);

    try {
        $mysql->query("INSERT INTO Utente (Matricola, Password, Nome, Cognome, Email, DataNascita, Ruolo, Sesso) VALUES ('" . $fresher . "', '" . $password . "', '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $birthdate . "', '" . $role . "', '" . $sex . "')");
        echo json_encode(array(
            "error" => false
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});


/**
 * Creates an user
 */
$router->post("StartUp/php/router.php/user/create", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    $fresher = filter_var($json->user->fresher, FILTER_SANITIZE_STRING);
    $password = crypt($json->user->password, "$2y$10$" . substr(md5(uniqid(rand(), true)), 0, 22));
    $firstName = filter_var($json->user->firstName, FILTER_SANITIZE_STRING);
    $lastName = filter_var($json->user->lastName, FILTER_SANITIZE_STRING);
    $email = filter_var($json->user->email, FILTER_SANITIZE_EMAIL);
    $birthdate = date("Y-m-d", strtotime(filter_var($json->user->birthdate, FILTER_SANITIZE_STRING)));
    $role = filter_var($json->user->role);
    $sex = filter_var($json->user->sex);

    try {
        $mysql->query("INSERT INTO Utente (Matricola, Password, Nome, Cognome, Email, DataNascita, Ruolo, Sesso) VALUES ('" . $fresher . "', '" . $password . "', '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $birthdate . "', '" . $role . "', '" . $sex . "')");
        echo json_encode(array(
            "error" => false
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Logs an user
 */
$router->post('StartUp/php/router.php/user/login', function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    $fresher = filter_var($json->user->fresher, FILTER_SANITIZE_STRING);
    $password = $json->user->password;

    try {
        $error = true;
        foreach ($mysql->query("SELECT Password AS password FROM Utente WHERE LOWER(Matricola) = '" . strtolower($fresher) . "' LIMIT 1") as $row) {
            if (crypt($password, $row["password"]) == $row["password"]) {
                $error = false;
            }
        }
        echo json_encode(array(
            "error" => $error
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});

/**
 * Returns all the sessions
 * TO COMPLETE
 */
$router->get('StartUp/php/router.php/sessions', function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Sessione.IdSessione AS sessionId, Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS partecipants, Dettagli AS details, MatricolaCreatore AS creatorFresher, IdAula AS classId, IdArgomento AS topicId, Richiede.IdMateriale AS itemId FROM Sessione LEFT JOIN Richiede On Sessione.IdSessione = Richiede.IdSessione") as $row) {
            $array[] = array(
                "id" => $row["sessionId"],
                "title" => $row["title"],
                "startingDate" => $row['startingDate'],
                "endingDate" => $row['endingDate'],
                "partecipants" => $row["partecipants"],
                "details" => $row["details"],
                "creator" => array(
                    "id" => $row["creatorFresher"]
                ),
                "class" => array(
                    "id" => $row["classId"]
                ),
                "topic" => array(
                    "id" => $row["topicId"]
                ),
                "material" => array(
                    "id" => $row["itemId"]
                )
            );
        }
        echo json_encode(array(
            "error" => false,
            "data" => $array
        ));
    } catch (PDOException $exception) {
        echo json_encode(array(
            "error" => true,
            "message" => $exception->getMessage()
        ));
    } finally {
        $mysql = null;
    }
});


$dispatcher = new Phroute\Phroute\Dispatcher($router->getData());

$response = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

echo $response;
