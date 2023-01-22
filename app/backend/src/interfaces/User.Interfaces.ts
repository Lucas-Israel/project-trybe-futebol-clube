export interface IUserName {
  username: string
}

export interface IUserEmail {
  email: string
}

export interface IUserLogin extends IUserEmail {
  password: string
}

export interface IUserComplete extends IUserLogin {
  id?: number
  role: string
  username: string
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

export interface IUserResultToken {
  status: number
  message: { token: string } | { message: string }
}

export interface IUserResultError {
  status: number
  message: string
}

export interface IUserDataValues {
  dataValues: IUserComplete
}
