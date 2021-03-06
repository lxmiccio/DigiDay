CREATE TABLE IF NOT EXISTS Utente (Matricola VARCHAR(15) NOT NULL PRIMARY KEY, Password VARCHAR(250) NOT NULL, Nome VARCHAR(25) NOT NULL, Cognome VARCHAR(25) NOT NULL, Email VARCHAR(50) NOT NULL UNIQUE, Amministratore BOOLEAN NOT NULL DEFAULT 0, DataNascita DATE NOT NULL, Ruolo VARCHAR(15) NOT NULL, Sesso VARCHAR(5) NOT NULL, Foto VARCHAR(250));

CREATE TABLE IF NOT EXISTS Aula (IdAula INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, Nome VARCHAR(4) NOT NULL UNIQUE, Capienza INT(11) NOT NULL, Caratteristiche TEXT);

CREATE TABLE IF NOT EXISTS Argomento (IdArgomento INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, Ambito VARCHAR(50) NOT NULL, Descrizione TEXT);

CREATE TABLE IF NOT EXISTS Materiale (IdMateriale INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, Nome VARCHAR(50) NOT NULL, Descrizione TEXT);

CREATE TABLE IF NOT EXISTS Sessione (IdSessione INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, Titolo VARCHAR(50) NOT NULL, DataInizio DATETIME NOT NULL, DataFine DATETIME NOT NULL, NumeroMassimo INT(11) NOT NULL, Dettagli TEXT, MatricolaCreatore VARCHAR(15) NOT NULL, IdAula INT(11) NOT NULL, IdArgomento INT(11) NOT NULL);

ALTER TABLE Sessione ADD CONSTRAINT FK_MatricolaCreatore FOREIGN KEY (MatricolaCreatore) REFERENCES Utente(Matricola) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Sessione ADD CONSTRAINT FK_IdAula FOREIGN KEY (IdAula) REFERENCES Aula(IdAula) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Sessione ADD CONSTRAINT FK_IdArgomento FOREIGN KEY (IdArgomento) REFERENCES Argomento(IdArgomento) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS Partecipa (MatricolaUtente VARCHAR(15) NOT NULL, IdSessione INT(11) NOT NULL, Valutazione INT(11), Recensione TEXT, PRIMARY KEY(MatricolaUtente, IdSessione));

ALTER TABLE Partecipa ADD CONSTRAINT FK_Partecipa_MatricolaUtente FOREIGN KEY (MatricolaUtente) REFERENCES Utente(Matricola) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Partecipa ADD CONSTRAINT FK_Partecipa_IdSessione FOREIGN KEY (IdSessione) REFERENCES Sessione(IdSessione) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS Richiede (IdSessione INT(11) NOT NULL, IdMateriale INT(11) NOT NULL, Valutazione INT(11), Recensione TEXT, PRIMARY KEY(IdSessione, IdMateriale));

ALTER TABLE Richiede ADD CONSTRAINT FK_Richiede_IdSessionea FOREIGN KEY (IdSessione) REFERENCES Sessione(IdSessione) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Richiede ADD CONSTRAINT FK_Richiede_IdMateriale FOREIGN KEY (IdMateriale) REFERENCES Materiale(IdMateriale) ON UPDATE CASCADE ON DELETE CASCADE;