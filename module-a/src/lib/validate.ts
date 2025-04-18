import { ValidationError } from "./error";

export class Validator {
  public name: string
  public data: any
  public error?: string
  constructor(name: string, data:any) {
    this.name = name;
    this.data = data;
  }

  exist() {
    if (!this.error)
    if (this.data === undefined)
      this.error = "field is required";
    return this;
  }
  
  len(min?: number, max?: number) {
    if (!this.error && this.data !== undefined)
    if (min && this.data.length < min)
      this.error = `field minimum length is ${min}`;
    else if (max && this.data.length > max)
      this.error = `field maximum length is ${max}`;
    return this;
  }
  
  kebab() {
    if (!this.error && this.data !== undefined) {
      this.string(/^[a-zA-Z0-9\-]+$/);
      if (this.error?.includes("match"))
        this.error = "field can only contain lowercase letters, numbers and dashes";
    }
    return this;
  }

  string(pattern?: RegExp) {
    if (!this.error && this.data !== undefined)
    if (typeof this.data != "string")
      this.error = "field must be type string";
    else if (pattern && !this.data.match(pattern))
      this.error = `field must match format ${pattern}`;
    return this;
  }

  boolean() {
    if (!this.error && this.data !== undefined)
    if (typeof this.data != "boolean")
      this.error = "field must be type boolean";
    return this;
  }

  integer(min?:number, max?:number) {
    if (!this.error && this.data !== undefined)
    if (!Number.isInteger(this.data))
      this.error = "field must be type integer";
    else if (min && this.data < min)
      this.error = `field must be larger than ${min}`;
    else if (max && this.data > max)
      this.error = `field must be larger than ${max}`;
    return this;
  }

  array() {
    if (!this.error && this.data !== undefined)
    if (!Array.isArray(this.data))
      this.error = "field must be type array";
    return this;
  }

  object() {
    if (!this.error && this.data !== undefined)
    if (typeof this.data != "object")
      this.error = "field must be type object";
    return this;
  }
}

export function field(name:string, data: any): Validator {
  return new Validator(name, data);
}

export function expect(...validators: Validator[]) {
  if (validators.some((v) => v.error)) {
    throw new ValidationError(
      validators.reduce((p,v) => ({...p, [v.name]: v.error}), {})
    );
  }
}