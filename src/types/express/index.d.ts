interface UserTypeInterface {
  uid: string;
  firstName?: string;
  lastName: string;
  email: string;
}
declare namespace Express {
  export interface Request {
    user: UserTypeInterface;
  }
}
