export interface Usuario_INT {
  readonly id_usuario: string;
  email: string;
  status: string;
  isadmin?: boolean;
  userName: string;
  photoURL: string;
  fecha_registro: string;
}

export interface Paciente_INT {
  readonly id_paciente: string;
  nombres: string;
  apellidos: string;
  nacimiento: string;
  peso: string;
  altura: string;
  codigo: string;
  id_representante?: number | any;
  img?: string;
}

export interface Representantes_INT {
  readonly cedula: number;
  nombres: string;
  apellidos: string;
  sexo: string;
}
