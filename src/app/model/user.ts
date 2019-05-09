export class User {
  constructor(
    private id: number,
    private email: string,
    private fullName: string,
    private isAdmin: number
  ) {}

  get IsAdmin() {
    return this.isAdmin;
  }

  get Fullname() {
    return this.fullName;
  }

  get Id() {
    return this.id;
  }

  get Email() {
    return this.email;
  }
}
