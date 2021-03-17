# Back end system

## Todo
- add ttl to inquiry
- inquiries users 
- inquiries machine
- alerts crud
- auth token in middleware

prefix `/api`

Als er rechten nodig zijn, verstuur ook altijd `uid` en `company` met de ingelogde gebruiker zijn id.
Voor het verandere op andere company kan men `fromCompany` meegeven. Dit gaat enkel als de gebruiker global rights heeft.

*Might be changed to jwt token*



## Company
prefix `/company`

|Method|Verb|Body|Bearer|Rechten|Beschrijving|
|:----:|:--:|:--:|:----:|:-----:|:----------:|
|POST|/|required<ul><li>`name`</li><li>`location`</li><li>`ttl`</li><li>`layout`</li><li>`resetFrequency`</li></ul> optional<ul><li>`imageURL`</li></ul>|Ja|<ul><li>company write</li><li>global</li></ul>|Maak een nieuwe company aan|
|POST|/|required<ul><li>`id`</li></ul> optional<ul><li>`fromCompany`</li></ul>|Ja|<ul><li>company write</li></ul>|update een company|
|POST|/delete|required<ul><li>`id`</li></ul>|Ja|<ul><li>company write</li><li>global</li></ul>|delete een company|
|GET|/|optional<ul><li>`fromCompany`</li></ul>|Ja|<ul><li>company read</li></ul>|verkrijg een company|
|GET|/all||Ja|<ul><li>company read</li><li>global</li></ul>|verkrijg alle companies|


Machine prefix:/machine
|Method|Verb|Body|Bearer|Rechten|Beschrijving|
|:----:|:--:|:--:|:----:|:-----:|:----------:|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`ttl`</li><li>`layout`</li><li>`resetFrequency`</li></ul> optional <ul><li>`imageURL`</li></ul>|True|<ul><li>`company write`</li><li>`global`</li></ul>|Maak een nieuwe company aan|     
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company write`</li></ul>|Update een company|
|POST|/delete|required <ul><li>`id`</li></ul> optional |True|<ul><li>`company write`</li><li>`global`</li></ul>|Delete een company|
|GET|/|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company read`</li></ul>|Verkrijg een company|     
|GET|/all|required  optional |True|<ul><li>`company read`</li><li>`global`</li></ul>|Verkrijg alle companies|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`maxStock`</li></ul> optional <ul><li>`stock`</li><li>`status`</li><li>`user`</li><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Maak een nieuwe machine aan|        
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Update een machine aan|
|POST|/delete|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Delete een machine|
|GET|/|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg een machine|
|GET|/all|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg alle machines||POST|/validate|required <ul><li>`machineId`</li></ul> optional <ul><li>`qr`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Valideer een rfid of qr code|
|POST|/success|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een success bij het afronden van een afhaling|
|POST|/failure|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een failure bij het afronden van een afhaling|
|GET|/motd|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de message of the day van 
de machine|
|GET|/layout|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de layout van de machine|


























Company	prefix:/company
|Method|Verb|Body|Bearer|Rechten|Beschrijving|
|:----:|:--:|:--:|:----:|:-----:|:----------:|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`ttl`</li><li>`layout`</li><li>`resetFrequency`</li></ul> optional <ul><li>`imageURL`</li></ul>|True|<ul><li>`company write`</li><li>`global`</li></ul>|Maak een nieuwe company aan|
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company write`</li></ul>|Update een company|
|POST|/delete|required <ul><li>`id`</li></ul> optional |True|<ul><li>`company write`</li><li>`global`</li></ul>|Delete een company|
|GET|/|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company read`</li></ul>|Verkrijg een company|
|GET|/all|required  optional |True|<ul><li>`company read`</li><li>`global`</li></ul>|Verkrijg alle companies|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`maxStock`</li></ul> optional <ul><li>`stock`</li><li>`status`</li><li>`user`</li><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Maak een nieuwe machine aan|
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Update een machine aan|
|POST|/delete|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Delete een machine|
|GET|/|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg een machine|
|GET|/all|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg alle machines|
|POST|/validate|required <ul><li>`machineId`</li></ul> optional <ul><li>`qr`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Valideer een rfid of qr code|
|POST|/success|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een success bij het afronden van een afhaling|
|POST|/failure|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een failure bij het afronden van een afhaling|
|GET|/motd|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de message of the day van de machine|
|GET|/layout|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de layout van de machine|

Machine	prefix:/machine
|Method|Verb|Body|Bearer|Rechten|Beschrijving|
|:----:|:--:|:--:|:----:|:-----:|:----------:|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`ttl`</li><li>`layout`</li><li>`resetFrequency`</li></ul> optional <ul><li>`imageURL`</li></ul>|True|<ul><li>`company write`</li><li>`global`</li></ul>|Maak een nieuwe company aan|
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company write`</li></ul>|Update een company|
|POST|/delete|required <ul><li>`id`</li></ul> optional |True|<ul><li>`company write`</li><li>`global`</li></ul>|Delete een company|
|GET|/|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`company read`</li></ul>|Verkrijg een company|
|GET|/all|required  optional |True|<ul><li>`company read`</li><li>`global`</li></ul>|Verkrijg alle companies|
|POST|/|required <ul><li>`name`</li><li>`location`</li><li>`maxStock`</li></ul> optional <ul><li>`stock`</li><li>`status`</li><li>`user`</li><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Maak een nieuwe machine aan|
|POST|/|required <ul><li>`id`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Update een machine aan|
|POST|/delete|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine write`</li></ul>|Delete een machine|
|GET|/|required <ul><li>`i`</li><li>`d`</li></ul> optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg een machine|
|GET|/all|required  optional <ul><li>`fromCompany`</li></ul>|True|<ul><li>`machine read`</li></ul>|Verkrijg alle machines|
|POST|/validate|required <ul><li>`machineId`</li></ul> optional <ul><li>`qr`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Valideer een rfid of qr code|
|POST|/success|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een success bij het afronden van een afhaling|
|POST|/failure|required <ul><li>`machineId`</li></ul> optional <ul><li>`qrinquiryId`</li><li>`rfid`</li></ul>|False|<ul><li>``</li></ul>|Stuur een failure bij het afronden van een afhaling|
|GET|/motd|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de message of the day van de machine|
|GET|/layout|required <ul><li>`machineId`</li></ul> optional |False|<ul><li>``</li></ul>|Verkrijg de layout van de machine|