#ConnardJS
##Introduction
Projet initie par Bastien Duplessier pour une certaine universite en Picardie.

##Installation
`npm install connard`

##Utilisation
Pour l'instant le module ne comprend que 2 methodes:  `parsing.fromFile` et `parsing.normal`
Il utilise la methode de parsing CSV: Chantrait en Séparation puis Valeur

```javascript
var connard = require('connard');
// params: file: nom du fichier (ex: file.chantrait) // returnAsString: true||false (default: false), retourne un JSON.stringify du JSON genere 
connard.parsing.chantrait.fromFile("file.chantrait", true);

var c = "name|CHANTRAIT|lname|CHANTRAIT|age\nThomas|CHANTRAIT|Chantrait|CHANTRAIT|22";
connard.parsing.chantrait.normal(c);
```