# Back end system

## Todo
- inquiries users 
- inquiries machine
- alerts crud
- auth token in middleware

prefix `/api`

Als er rechten nodig zijn, verstuur ook altijd `uid` en `company` met de ingelogde gebruiker zijn id.
Voor het verandere op andere company kan men `fromCompany` meegeven. Dit gaat enkel als de gebruiker global rights heeft.

*Might be changed to jwt token*

## USER

prefix `/user`

| Method |  Verb   |                                                                          Body                                                                          | Rechten |                                                Beschrijving                                                 |
| :----- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :---------------------------------------------------------------------------------------------------------: |
| POST   |    /    |       required<ul><li>`company`</li><li>`firstname`</li><li>`role`</li></ul> optional<ul><li>`lastname`</li><li>`msid`</li><li>`rfid`</li></ul>        |  Write  |                                       Maakt een nieuwe gebruiker aan                                        |
| POST   |    /    | required<ul><li>`id`</li><li>`company`</li><li>`firstname`</li><li>`role`</li></ul> optional<ul><li>`lastname`</li><li>`msid`</li><li>`rfid`</li></ul> |  Write  |                                           Update een user via id                                            |
| POST   | /delete |                                                             required<ul><li>`id`</li></ul>                                                             |  Write  |                                           Delete een user via id                                            |
| GET    |    /    |                                                                 optional <li>`id`</li>                                                                 |  Read   | Verkrijg de user via id als deze is meegegeven. Indien geen id, verkrijg user via uid (ingelogde gebruiker) |
| GET    |  /all   |                                                                                                                                                        |  Read   |                                           Verkrijg alle gebruiker                                           |
| GET    |   /me   |                                                                                                                                                        |         |                                        Verkrijg ingelogde gebruiker                                         |




## ROLE

perfix `/role`

| Method |  Verb   |                                                      Body                                                       | Rechten |       Beschrijving        |
| :----: | :-----: | :-------------------------------------------------------------------------------------------------------------: | :-----: | :-----------------------: |
|  POST  |    /    |       required <ul><li>`name`</li><li>`defaultMaxItems`</li><li>`permissions`</li><li>`company`</li><ul>        |  Write  | Maakt een nieuwe role aan |
|  POST  |    /    | required <ul><li>`id`</li><li>`name`</li><li>`defaultMaxItems`</li><li>`permissions`</li><li>`company`</li><ul> |  Write  |  Update een role via id   |
|  POST  | /delete |                                          required <ul><li>id</li><ul>                                           |  Write  |  delete een role via id   |
|  GET   |    /    |                                         required <ul><li>`id`</li><ul>                                          |         |    get een role via id    |
|  GET   |  /all   |                                                                                                                 |         |    verkrijg alle roles    |

