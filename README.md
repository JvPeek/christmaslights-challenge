# christmaslights-challenge

Hilf mir, meinen Baum zum Leuchten zu bringen.
Der Baum hat 50 LEDs, die jeweils drei Kanäle haben. Rot, grün und blau.
Die Daten werden per E1.31 zum Baum (WLED) geschickt. Hierzu habe ich Euch in der index.js bereits eine Library vorbereitet.


Die Kanäle werden nacheinander angesprochen.

ROT1, GRÜN1, BLAU1, ROT2, GRÜN2, BLAU2 [...]


Installation:

npm install
node index.js
