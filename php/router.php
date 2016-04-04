<?php

require_once ".." . DIRECTORY_SEPARATOR . "libraries" . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

$router = new Phroute\Phroute\RouteCollector();



$router->get('StartUp/php/router.php/emails', function() {

    require_once "connection.php";

    $array = array();

    foreach ($mysql->query("SELECT Email AS email FROM Utente") as $row) {
        $array[] = $row["email"];
    }

    echo json_encode($array);
});

$router->get('StartUp/php/router.php/freshers', function() {

    require_once "connection.php";

    $array = array();

    foreach ($mysql->query("SELECT Matricola AS fresher FROM Utente") as $row) {
        $array[] = $row["fresher"];
    }

    echo json_encode($array);
});

$router->get('StartUp/php/router.php/sessions', function() {

    require_once "connection.php";

    $array = array();

    foreach ($mysql->query("SELECT Titolo AS title, DataInizio AS startingDate, DataFine AS endingDate, NumeroMassimo AS maxNumber, Dettagli AS details FROM Sessione") as $row) {
        $array[] = array(
            "title" => $row["title"],
            "start" => str_replace(" ", "T", $row['startingDate']) . "Z",
            "end" => str_replace(" ", "T", $row['endingDate']) . "Z"
        );
    }

    echo json_encode($array);
});

$router->post('StartUp/php/router.php/user/registration', function() {

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

    $mysql->query("INSERT INTO Utente (Matricola, Password, Nome, Cognome, Email, DataNascita, Ruolo, Sesso) VALUES ('" . $fresher . "', '" . $password . "', '" . $firstName . "', '" . $lastName . "', '" . $email . "', '" . $birthdate . "', '" . $role . "', '" . $sex . "')");
});

$router->post('StartUp/php/router.php/user/login', function() {

    require_once "connection.php";

    $json = json_decode(file_get_contents('php://input'));

    $fresher = filter_var($json->user->fresher, FILTER_SANITIZE_STRING);
    $password = $json->user->password;

    foreach ($mysql->query("SELECT Password AS password FROM Utente WHERE LOWER(Matricola) = '" . strtolower($fresher) . "' LIMIT 1") as $row) {
        if (crypt($password, $row["password"]) == $row["password"]) {
            //TODO Login avvenuto con successo
        }
    }
});



$dispatcher = new Phroute\Phroute\Dispatcher($router->getData());

$response = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

echo $response;
