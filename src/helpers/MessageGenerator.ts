import { IUser } from "../model/User";
export default class MessageCreator {
  constructor() {}

  static generate(message: string, user: IUser) {
    let newString = message.replace( /{firstname}/g, user.firstname);
    newString = newString.replace(/{lastname}/g, user.lastname);
    newString = newString.replace(/{email}/g, user.email);
    return newString
  }
}
