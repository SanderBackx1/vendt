# Back end system

prefix `/api`
Always send `uid` with the current user id.

## USER

prefix `/user`

| Method | Verb |   Body | Rights | Description |
| :----- | :--: | :----------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----: |
|POST| /| required<ul><li>`company`</li><li>`firstname`</li><li>`role`</li></ul> optional<ul><li>`lastname`</li><li>`msid`</li><li>`rfid`</li></ul>| Write| Creates a new user|
| GET    |  /   |       optional <li>`id`</li>          | Read | retrieves user by id if given. Otherwise retrieves by uid (current user)|
| GET    | /all |                                                                                                                                                 |                           Read                           |  retrieves all users   |
| GET    | /me  |                                                                                                                                                 |                                                   |    retrieves current user     |
