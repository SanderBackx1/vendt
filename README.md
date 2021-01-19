# Back end system

prefix `/api`
Always send `uid` with the current user id.

## USER

prefix `/user`

| Method | Verb |                                                                      Body                                                                       |                               Description                                | Rights |
| :----- | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----: |
| POST   |  /   | required<ul><li>`company`</li><li>`firstname`</li><li>`role`</li></ul></li> optional <ul><li>`lastname`</li><li>`msid`</li><li>`rfid`</li></ul> |                            creates a new user                            | Write  |
| GET    |  /   |                                                             optional <li>`id`</li>                                                              | retrieves user by id if given. Otherwise retrieves by uid (current user) |  Read  |
| GET    | /all |                                                                                                                                                 |                           retrieves all users                            |  Read  |
| GET    | /me  |                                                                                                                                                 |                          retrieves current user                          |        |
