export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}
