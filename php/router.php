<?php

require_once ".." . DIRECTORY_SEPARATOR . "libraries" . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

$router = new Phroute\Phroute\RouteCollector();

session_start();

function logout() {
    session_unset();
    session_destroy();
}

/**
 * Creates a classroom
 */
$router->post("StartUp/php/router.php/administrator/create/classroom", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $name = filter_var($json->classroom->name, FILTER_SANITIZE_STRING);
    $capacity = filter_var($json->classroom->capacity, FILTER_SANITIZE_NUMBER_INT);
    $features = filter_var($json->classroom->features, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("INSERT INTO Aula (Nome, Capienza, Caratteristiche) VALUES ('" . $name . "', " . $capacity . ", '" . $features . "')");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Aula aggiunta con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile aggiungere l'Aula"
            ));
        }
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
 * Creates an item
 */
$router->post("StartUp/php/router.php/administrator/create/item", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $name = filter_var($json->item->name, FILTER_SANITIZE_STRING);
    $description = filter_var($json->item->description, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("INSERT INTO Materiale (Nome, Descrizione) VALUES ('" . $name . "', '" . $description . "')");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Materiale aggiunto con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile aggiungere il Materiale"
            ));
        }
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
 * Creates a topic
 */
$router->post("StartUp/php/router.php/administrator/create/topic", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $scope = filter_var($json->topic->scope, FILTER_SANITIZE_STRING);
    $description = filter_var($json->topic->description, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("INSERT INTO Argomento (Ambito, Descrizione) VALUES ('" . $scope . "', '" . $description . "')");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Materiale aggiunto con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile aggiungere il Materiale"
            ));
        }
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
 * Updates a classroom
 */
$router->post("StartUp/php/router.php/administrator/update/classroom", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->classroom->id, FILTER_SANITIZE_NUMBER_INT);
    $name = filter_var($json->classroom->name, FILTER_SANITIZE_STRING);
    $capacity = filter_var($json->classroom->capacity, FILTER_SANITIZE_NUMBER_INT);
    $features = filter_var($json->classroom->features, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("UPDATE Aula SET Nome = '" . $name . "', Capienza = '" . $capacity . "', Caratteristiche = '" . $features . "' WHERE IdAula = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Aula modificata con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile modificare l'Aula"
            ));
        }
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
 * Updates an item
 */
$router->post("StartUp/php/router.php/administrator/update/item", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->item->id, FILTER_SANITIZE_NUMBER_INT);
    $name = filter_var($json->item->name, FILTER_SANITIZE_STRING);
    $description = filter_var($json->item->description, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("UPDATE Materiale SET Nome = '" . $name . "', Descrizione = '" . $description . "' WHERE IdMateriale = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Materiale modificato con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile modificato il Materiale"
            ));
        }
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
 * Updates a topic
 */
$router->post("StartUp/php/router.php/administrator/update/topic", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->topic->id, FILTER_SANITIZE_NUMBER_INT);
    $scope = filter_var($json->topic->scope, FILTER_SANITIZE_STRING);
    $description = filter_var($json->topic->description, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("UPDATE Argomento SET Ambito = '" . $scope . "', Descrizione = '" . $description . "' WHERE IdArgomento = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Argomento modificato con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile modificare l'Argomento"
            ));
        }
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
 * Deletes a classroom
 */
$router->post("StartUp/php/router.php/administrator/delete/classroom", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->id, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("DELETE FROM Aula WHERE IdAula = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Aula eliminata con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile eliminare l'Aula"
            ));
        }
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
 * Deletes an item
 */
$router->post("StartUp/php/router.php/administrator/delete/item", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->id, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("DELETE FROM Materiale WHERE IdMateriale = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Materiale eliminato con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile eliminare il Materiale"
            ));
        }
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
 * Deletes a topic
 */
$router->post("StartUp/php/router.php/administrator/delete/topic", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $id = filter_var($json->id, FILTER_SANITIZE_STRING);

    try {
        $result = $mysql->query("DELETE FROM Argomento WHERE IdArgomento = '" . $id . "'");
        if ($result->rowCount() > 0) {
            echo json_encode(array(
                "error" => false,
                "message" => "Argomento eliminato con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile eliminare l'Argomento"
            ));
        }
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
 * Returns all the sessions to print them into the calendar
 */
$router->get("StartUp/php/router.php/user/sessions/calendar", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS maxNumber, Dettagli AS details FROM Sessione WHERE MatricolaCreatore = '" . $_SESSION["fresher"] . "'") as $row) {
            $array[] = array(
                "title" => $row["title"],
                "start" => str_replace(" ", "T", $row["startingDate"]) . "Z",
                "end" => str_replace(" ", "T", $row["endingDate"]) . "Z"
            );
        }
        echo json_encode(array(
            "error" => false,
            "sessions" => $array
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
            "sessions" => $array
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
 * Logs an user
 */
$router->post("StartUp/php/router.php/user/login", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    $fresher = filter_var($json->user->fresher, FILTER_SANITIZE_STRING);
    $password = $json->user->password;

    try {
        $error = true;
        foreach ($mysql->query("SELECT Matricola AS fresher, Password AS password, Nome AS firstName, Cognome AS lastName, Email AS email, DataNascita AS birthdate, Ruolo AS role, Sesso AS sex, Foto AS photo FROM Utente WHERE LOWER(Matricola) = '" . strtolower($fresher) . "' LIMIT 1") as $row) {
            if (crypt($password, $row["password"]) == $row["password"]) {
                $error = false;

                $_SESSION["fresher"] = $row["fresher"];
                $_SESSION["firstName"] = $row["firstName"];
                $_SESSION["lastName"] = $row["lastName"];
                $_SESSION["email"] = $row["email"];
                $_SESSION["birthdate"] = $row["birthdate"];
                $_SESSION["role"] = $row["role"];
                $_SESSION["sex"] = $row["sex"];
                $_SESSION["photo"] = $row["photo"];
            }
        }
        if ($error) {
            echo json_encode(array(
                "error" => $error,
                "message" => "Autenticazione fallita"
            ));
        } else {
            echo json_encode(array(
                "error" => $error,
                "message" => "Autenticato con successo"
            ));
        }
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
 * Logs the user out
 */
$router->get("StartUp/php/router.php/user/logout", function() {
    logout();

    echo json_encode(array(
        "error" => false,
        "message" => ""
    ));
});

/**
 * Returns the logged user
 */
$router->get("StartUp/php/router.php/user/me", function() {
    if (isset($_SESSION["fresher"])) {
        echo json_encode(array(
            "error" => false,
            "user" => array(
                "fresher" => $_SESSION["fresher"],
                "firstName" => $_SESSION["firstName"],
                "lastName" => $_SESSION["lastName"],
                "email" => $_SESSION["email"],
                "birthdate" => $_SESSION["birthdate"],
                "role" => $_SESSION["role"],
                "sex" => $_SESSION["sex"],
                "photo" => $_SESSION["photo"]
            )
        ));
    } else {
        echo json_encode(array(
            "error" => true,
            "message" => "Utente non autenticato"
        ));
    }
});

/**
 * Returs all the user's sessions
 */
$router->get("StartUp/php/router.php/user/sessions", function() {
    require_once "connection.php";

    try {
        $array = array();

        foreach ($mysql->query("SELECT Sessione.IdSessione AS sessionId, Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS partecipants, Dettagli AS details, MatricolaCreatore AS creatorFresher, Nome AS creatorFirstName, Cognome AS creatorLastName, IdAula AS classId, IdArgomento AS topicId, Richiede.IdMateriale AS itemId FROM Sessione LEFT JOIN Richiede On Sessione.IdSessione = Richiede.IdSessione INNER JOIN Utente ON Sessione.MatricolaCreatore = Utente.Matricola WHERE Sessione.MatricolaCreatore = '" . $_SESSION["fresher"] . "'") as $row) {
            $array[] = array(
                "id" => $row["sessionId"],
                "title" => $row["title"],
                "startingDate" => $row['startingDate'],
                "endingDate" => $row['endingDate'],
                "partecipants" => $row["partecipants"],
                "details" => $row["details"],
                "creator" => array(
                    "id" => $row["creatorFresher"],
                    "firstName" => $row["creatorFirstName"],
                    "lastName" => $row["creatorLastName"]
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
            "sessions" => $array
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

/**
 * Updates the user's email
 */
$router->post("StartUp/php/router.php/user/email", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    $email = filter_var($json->email, FILTER_SANITIZE_EMAIL);

    try {
        $result = $mysql->query("UPDATE Utente SET Email = '" . $email . "' WHERE Matricola = '" . $_SESSION["fresher"] . "'");
        if ($result->rowCount() > 0) {
            $_SESSION["email"] = $email;
            echo json_encode(array(
                "error" => false,
                "message" => "Email modificata con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile modifcare l'Email"
            ));
        }
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
 * Updates the user's password
 */
$router->post("StartUp/php/router.php/user/password", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $oldPassword = $json->user->oldPassword;
    $password = crypt($json->user->password, "$2y$10$" . substr(md5(uniqid(rand(), true)), 0, 22));

    try {
        $error = true;
        foreach ($mysql->query("SELECT Matricola AS fresher, Password AS password, Nome AS firstName, Cognome AS lastName, Email AS email, DataNascita AS birthdate, Ruolo AS role, Sesso AS sex, Foto AS photo FROM Utente WHERE LOWER(Matricola) = '" . $_SESSION["fresher"] . "' LIMIT 1") as $row) {
            if (crypt($oldPassword, $row["password"]) == $row["password"]) {
                $error = false;
                $result = $mysql->query("UPDATE Utente SET Password = '" . $password . "' WHERE Matricola = '" . $_SESSION["fresher"] . "'");
                if ($result->rowCount() > 0) {
                    echo json_encode(array(
                        "error" => false,
                        "message" => "Password modificata con successo"
                    ));
                } else {
                    echo json_encode(array(
                        "error" => false,
                        "message" => "Impossibile modifcare la Password"
                    ));
                }
            }
        }
        if ($error) {
            echo json_encode(array(
                "error" => $error,
                "message" => "Password attuale errata"
            ));
        }
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
 * Updates the user's photo
 */
$router->post("StartUp/php/router.php/user/photo", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $photo = $json->photo;

    try {
        $result = $mysql->query("UPDATE Utente SET Foto = '" . $photo . "' WHERE Matricola = '" . $_SESSION["fresher"] . "'");
        if ($result->rowCount() > 0) {
            $_SESSION["photo"] = $photo;
            echo json_encode(array(
                "error" => false,
                "message" => "Immagine modificata con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile modifcare l'Immagine"
            ));
        }
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
 * Delete the user
 */
$router->post("StartUp/php/router.php/user/delete", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $password = $json->password;

    try {
        $error = true;
        foreach ($mysql->query("SELECT Matricola AS fresher, Password AS password, Nome AS firstName, Cognome AS lastName, Email AS email, DataNascita AS birthdate, Ruolo AS role, Sesso AS sex, Foto AS photo FROM Utente WHERE LOWER(Matricola) = '" . $_SESSION["fresher"] . "' LIMIT 1") as $row) {
            if (crypt($password, $row["password"]) == $row["password"]) {
                $error = false;
                $result = $mysql->query("DELETE FROM Utente WHERE Matricola = '" . $_SESSION["fresher"] . "'");
                if ($result->rowCount() > 0) {
                    echo json_encode(array(
                        "error" => false,
                        "message" => "Utente eliminato con successo"
                    ));
                } else {
                    echo json_encode(array(
                        "error" => false,
                        "message" => "Impossibile eliminare l'Utente"
                    ));
                }
            }
        }
        if ($error) {
            echo json_encode(array(
                "error" => $error,
                "message" => "Password errata"
            ));
        }
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
    $role = filter_var($json->user->role, FILTER_SANITIZE_STRING);
    $sex = filter_var($json->user->sex, FILTER_SANITIZE_STRING);

    try {
        if (!strcmp($sex, "Donna")) {
            $photo = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png";
        } else {
            $photo = "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png";
        }
        $result = $mysql->query("INSERT INTO Utente (Matricola, Password, Nome, Cognome, Email, DataNascita, Ruolo, Sesso, Foto) VALUES ('" . $fresher . "', '" . $password . "', '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $birthdate . "', '" . $role . "', '" . $sex . "', '" . $photo . "')");
        if ($result->rowCount() > 0) {
            $_SESSION["fresher"] = $fresher;
            $_SESSION["firstName"] = $firstName;
            $_SESSION["lastName"] = $lastName;
            $_SESSION["email"] = $email;
            $_SESSION["birthdate"] = $birthdate;
            $_SESSION["role"] = $role;
            $_SESSION["sex"] = $sex;
            $_SESSION["photo"] = $photo;

            echo json_encode(array(
                "error" => false,
                "message" => "Registrato con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile registrarsi"
            ));
        }
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
        foreach ($mysql->query("SELECT Aula.IdAula AS id, Nome AS name, Capienza AS capacity, Caratteristiche AS features, DataInizio AS startingDate, DataFine AS endingDate FROM Aula LEFT OUTER JOIN Sessione ON Aula.IdAula = Sessione.IdAula") as $row) {
            $added = false;
            foreach ($array as &$object) {
                if ($object["id"] == $row["id"]) {
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
                        "id" => $row["id"],
                        "name" => $row["name"],
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
                        "id" => $row["id"],
                        "name" => $row["name"],
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
 */
$router->get("StartUp/php/router.php/items", function() {
    require_once "connection.php";

    try {
        $array = array();
        foreach ($mysql->query("SELECT Materiale.IdMateriale AS id, Descrizione AS description, Nome AS name, DataInizio AS startingDate, DataFine AS endingDate FROM Materiale LEFT OUTER JOIN Richiede ON Materiale.IdMateriale = Richiede.IdMateriale LEFT OUTER JOIN Sessione ON Richiede.IdSessione = Sessione.IdSessione") as $row) {
            $added = false;
            foreach ($array as &$object) {
                if ($object["id"] == $row["id"]) {
                    $added = true;
                    if (is_array($object["id"])) {
                        $object["item"][] = array(
                            "startingDate" => $row["startingDate"],
                            "endingDate" => $row["endingDate"]
                        );
                    } else {
                        $object["id"] = array();
                        $object["id"][] = array(
                            "startingDate" => $row["startingDate"],
                            "endingDate" => $row["endingDate"]
                        );
                    }
                }
            }
            if (!$added) {
                if (isset($row["startingDate"]) || isset($row["endingDate"])) {
                    $array[] = array(
                        "id" => $row["id"],
                        "description" => $row["description"],
                        "name" => $row["name"],
                        "sessions" => array(
                            array(
                                "startingDate" => $row["startingDate"],
                                "endingDate" => $row["endingDate"]
                            )
                        )
                    );
                } else {
                    $array[] = array(
                        "id" => $row["id"],
                        "description" => $row["description"],
                        "name" => $row["name"],
                        "sessions" => null
                    );
                }
            }
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
 * Returns all the sessions
 */
$router->get("StartUp/php/router.php/sessions", function() {
    require_once "connection.php";

    try {
        $array = array();
        //foreach ($mysql->query("SELECT Sessione.IdSessione AS sessionId, Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS partecipants, Dettagli AS details, MatricolaCreatore AS creatorFresher, IdAula AS classId, IdArgomento AS topicId, Richiede.IdMateriale AS itemId FROM Sessione LEFT JOIN Richiede On Sessione.IdSessione = Richiede.IdSessione") as $row) {

        foreach ($mysql->query("SELECT Sessione.IdSessione AS sessionId, Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS partecipants, Dettagli AS details, MatricolaCreatore AS creatorFresher, Nome AS creatorFirstName, Cognome AS creatorLastName, IdAula AS classId, IdArgomento AS topicId, Richiede.IdMateriale AS itemId FROM Sessione LEFT JOIN Richiede On Sessione.IdSessione = Richiede.IdSessione INNER JOIN Utente ON Sessione.MatricolaCreatore = Utente.Matricola") as $row) {
            $array[] = array(
                "id" => $row["sessionId"],
                "title" => $row["title"],
                "startingDate" => $row['startingDate'],
                "endingDate" => $row['endingDate'],
                "partecipants" => $row["partecipants"],
                "details" => $row["details"],
                "creator" => array(
                    "id" => $row["creatorFresher"],
                    "firstName" => $row["creatorFirstName"],
                    "lastName" => $row["creatorLastName"]
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
            "sessions" => $array
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
        foreach ($mysql->query("SELECT IdArgomento AS id, Ambito AS scope, Descrizione AS description FROM Argomento") as $row) {
            $array[] = array(
                "id" => $row["id"],
                "scope" => $row["scope"],
                "description" => $row["description"]
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
 */
$router->post("StartUp/php/router.php/session/create", function() {
    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));
    var_dump($json);
    $title = filter_var($json->session->title, FILTER_SANITIZE_STRING);
    $startingDate = date("Y-m-d H:i:s", strtotime(filter_var($json->session->startingDate, FILTER_SANITIZE_STRING)));
    $endingDate = date("Y-m-d H:i:s", strtotime(filter_var($json->session->endingDate, FILTER_SANITIZE_STRING)));
    $maxPartecipants = filter_var($json->session->maxPartecipants, FILTER_SANITIZE_STRING);
    $details = filter_var($json->session->details, FILTER_SANITIZE_STRING);
    $items = $json->session->items;
    $creator = $_SESSION["fresher"];
    $classroom = filter_var($json->session->classroom, FILTER_SANITIZE_STRING);
    $topic = filter_var($json->session->topic, FILTER_SANITIZE_STRING);

    try {
        echo "INSERT INTO Sessione (Titolo, DataInizio, DataFine, NumeroMassimo, Dettagli, MatricolaCreatore, IdAula, IdArgomento) VALUES ('" . $title . "', '" . $startingDate . ':00' . "', '" . $endingDate . ':00' . "', '" . $maxPartecipants . "', '" . $details . "', " . $creator . ", '" . $classroom . "', (SELECT IdArgomento FROM Argomento WHERE Ambito='" . $topic . "'))";
        $result = $mysql->query("INSERT INTO Sessione (Titolo, DataInizio, DataFine, NumeroMassimo, Dettagli, MatricolaCreatore, IdAula, IdArgomento) VALUES ('" . $title . "', '" . $startingDate . ':00' . "', '" . $endingDate . ':00' . "', '" . $maxPartecipants . "', '" . $details . "', " . $creator . ", '" . $classroom . "', (SELECT IdArgomento FROM Argomento WHERE Ambito='" . $topic . "'))");

        if ($result->rowCount() > 0) {
            $id = $mysql->lastInsertId();

            foreach ($items as $item) {
                $mysql->query("INSERT INTO Richiede (IdSessione, IdMateriale) VALUES (" . $id . ", " . $item . ")");
            }

            echo json_encode(array(
                "error" => false,
                "message" => "Sessione creata con successo"
            ));
        } else {
            echo json_encode(array(
                "error" => false,
                "message" => "Impossibile creare la Sessione"
            ));
        }
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
