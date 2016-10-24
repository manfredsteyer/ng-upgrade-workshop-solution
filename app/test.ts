import './vendor';
import 'angular-mocks/ngMock';
import './app';

// .spec.ts-Dateien explizit angeben
/*
 import './flug-suchen/simple.spec';
 import './flug-suchen/flug-suchen.spec';
 import './flug-suchen/flug-suchen.http-mock.spec';
*/

// Alle .spec.ts-Dateien laden
var req = (<any>require).context('./', true, /spec\.ts$/);
req.keys().forEach(req);