export interface IUserName {
  username: string
}

export interface IUserLogin extends IUserName {
  password: string
}

export interface IUserComplete extends IUserLogin {
  id?: number
  role: string
  email: string
}

export interface IUserCompleteNoPassword extends IUserName {
  id?: number
  role: string
  email: string
}

export interface IUserResult {
  status: number
  message: IUserCompleteNoPassword
}

export interface IUserResultError {
  status: number
  message: string
}
