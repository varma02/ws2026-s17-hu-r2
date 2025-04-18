export class BaseError extends Error {
  public code: number
  constructor(code:number, message: string) {
    super(message)
    this.code = code
  }
}

export class NotFoundError extends BaseError {
  constructor() { super(404, "Not found"); }
}

export class InvalidTokenError extends BaseError {
  constructor() { super(401, "Please log in"); }
}

export class InvalidCredsError extends BaseError {
  constructor() { super(401, "Invalid credentials"); }
}

export class ValidationError extends BaseError {
  public validations: {[key:string]: string}
  constructor(validations: {[key:string]: string}) {
    super(422, "Request body is invalid");
    this.validations = validations;
  }
}