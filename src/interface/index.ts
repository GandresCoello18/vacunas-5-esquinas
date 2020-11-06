export interface MyUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface Paciente {
  id_paciente: string;
  nombres: string;
  apellidos: string;
  peso: number;
  altura: number;
  codigo?: string;
}
