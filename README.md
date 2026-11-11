# Einkaufsliste 🛒

Eine einfache Einkaufsliste im Browser. Die Produkte werden lokal im Browser
gespeichert und nicht zwischen Geräten synchronisiert.

## Voraussetzungen

Node.js 20.19+, 22.13+ oder 24+ und npm.

Der Vite-Build benötigt einen modernen Browser mit nativen ES-Modulen.
Anders als beim früheren Vue-CLI-Build bestimmt `.browserslistrc` nicht das
JavaScript-Buildziel; ältere Browser erhalten keine automatischen Polyfills.

## Entwicklung

```sh
npm install
npm run dev
```

Vite startet den Entwicklungsserver standardmäßig auf Port 3000.

## Build und Vorschau

```sh
npm run build
npm run serve
```

Der Build liegt in `dist`. `serve` zeigt diesen Produktionsbuild an und ist
kein Entwicklungsserver.

## Tests und Prüfung

```sh
npm run test:unit
npm run lint
npm run typecheck
```

Die Typprüfung schlägt derzeit wegen Fehlern in den mit Vuetify ausgelieferten
Typdeklarationen fehl (unter anderem
[vuetifyjs/vuetify#21227](https://github.com/vuetifyjs/vuetify/issues/21227)).
Diese Fehler liegen außerhalb des Anwendungscodes.

## Offline-Nutzung

Der Produktionsbuild enthält ein Web-App-Manifest und einen Service Worker.
Nach dem ersten Laden mit Netzwerkverbindung kann die App auch offline verwendet
werden. Service Worker benötigen HTTPS oder `localhost`; im Entwicklungsserver
sind sie nicht aktiviert.
