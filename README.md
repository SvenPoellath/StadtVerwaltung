# Stadtverwaltung PJMS - Schadensmelder Ludwigshafen

## Über dieses Projekt

Die PJMS Stadtverwaltung ist ein Projekt von Studierenden der HWG Ludwigshafen. Das Tool bietet Bürger:innen der Stadt Ludwigshafen mithilfe eines React Frontends und eines Java/SpringBoot Backends die Möglichkeit, Schäden und Verstöße in der Stadt digital zu melden und beheben zu lassen.

## Development Setup
- Visual Studio Code, Node.JS und Git installieren zur Frontendentwicklung (empfohlen)
- Installieren der [Java Erweiterungen für Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) oder (optional) [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) für Backend-Entwicklung
- Erstellen eines neuen Ordners und Klonen des Github Projekts

```
    git clone https://github.com/SvenPoellath/StadtVerwaltung
```

### Frontend Einrichtung
-   Notwendige Node.JS Pakete mittels yarn installieren (Befehl vom Hauptordner des Projekts ausführen)

```
    npm install yarn
    yarn install
```
-   Sollte das Ausführen von (Yarn) Skripten nicht zugelassen sein, kann dies über eine Windows-Powershell mit Administratorrechten durch folgenden Befehl geändert werden

```
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

-   Der folgende Befehl kann genutzt werden, um eventuelle Sicherheitsprobleme zu beheben

```
    npm fund
    npm audit fix
´´´

### Backend Einrichtung
-   Maven Projekt mithilfe von Visual Studio Code oder IntelliJ initialisieren

## Start der Anwendung

-   Java Backend von DpdBackendApplication.class (main Methode) aus starten (localhost:8080)

-   React Frontend mit Node.JS Server starten (localhost:3000) 
```
    npm start
```

## Technical Details
|                                                                                                                                 |
|---------------------------------------------------------------------------------------------------------------------------------|
| **General information**<br>This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). |
| **Module Name**<br>pjms                                                                                                         |
| **Application Title**<br>Stadtverwaltung                                                                                        |
| **Namespace**<br>com.pjms.stadtverwaltung                                                                                       | 
| **Credits**<br>Paulina Kohlhepp<br>Jonas Jamin<br>Moritz Schley<br>Sven Pöllath                                                 |
