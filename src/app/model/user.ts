export class User {
  constructor(
    private _id: number,
    private _email: string,
    private _fullName: string,
    private _isAdmin: boolean
  ) {}

  get isAdmin() {
    return this._isAdmin;
  }

  get fullname() {
    return this._fullName;
  }
}
