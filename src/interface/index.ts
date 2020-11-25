export interface Usuario_INT {
  readonly id_usuario: string;
  email: string;
  status: string;
  isAdmin?: boolean | number;
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
  temperatura: string;
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

export interface Discucion_INT {
  readonly id_discucion: string;
  id_usuario: string | undefined;
  asunto: string;
  contenido: string;
  pacientes: Array<string>;
  fecha_discucion?: string;
}

export interface Discucion_Menciones_INT {
  id_discucion: string;
  id_discucion_mencion: string;
  asunto: string;
  contenido: string;
  fecha_discucion: string;
  id_usuario: string;
  userName: string;
  photoURL: string;
  isAdmin: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  img: string;
  id_paciente: string;
}

export interface Vacunas_INT {
  readonly id_vacuna: number;
  vacuna_name: string;
  cantidad: number;
}

export interface Comentario_Discucion_INT {
  id_comentario_mencion: string;
  id_usuario: string;
  id_discucion_mencion: string;
  fecha_comentario: string;
  comentario: string;
  userName: string;
  photoURL: string;
  isAdmin: boolean | number;
}

export interface Vacuna_Paciente_INT {
  readonly id_vacuna_paciente: string;
  id_paciente: string;
  id_usuario: string | undefined;
  id_vacuna: number;
  fecha_vacuna?: string;
  observaciones: string;
}

export interface Vacuna_Paciente_Relacionado_INT {
  fecha_vacuna: string;
  observaciones: string;
  id_vacuna_paciente: string;
  id_usuario: string;
  userName: string;
  photoURL: string;
  isAdmin: number | boolean;
  vacuna_name: string;
}

export interface Mis_Vacunas_INT {
  vc: string;
  list: Array<Vacuna_Paciente_Relacionado_INT>;
}

export interface Peso_Altura_INT {
  id_seguimiento: string;
  peso: number;
  altura: number;
  temperatura: number;
  id_paciente: string;
  fecha_seguimiento?: string;
}
