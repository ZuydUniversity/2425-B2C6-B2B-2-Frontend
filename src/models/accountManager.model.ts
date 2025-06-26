interface AccountManagerConstructor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
}

export default class AccountManager {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public department: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    department,
  }: AccountManagerConstructor) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.department = department;
  }
}
