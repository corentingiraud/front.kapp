export class User {

  _id: String;
  username: String;
  role:String;
  code: Date;
  password: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
