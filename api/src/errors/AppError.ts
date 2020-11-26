/**
 * Created by erivelto on 25/11/20
 */

class AppError implements Error{
  public readonly message: string;

  public readonly statusCode: number;

  public name: string;

  constructor (message: string, statusCode = 400, name = 'Error') {
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
}

export default AppError;
