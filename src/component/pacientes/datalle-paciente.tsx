import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Paciente_INT, Representantes_INT } from "../../interface";
import { CardDetallePaciente } from "./card-detalles-paciente";

interface Props {
  id_paciente?: string;
}

export function DetallePaciente({ id_paciente }: Props) {
  const [thisPaciente, setThisPaciente] = useState<Paciente_INT | undefined>({
    id_paciente: "",
    nombres: "",
    apellidos: "",
    nacimiento: "",
    id_representante: 0,
    codigo: "",
    peso: "",
    altura: "",
    img: "",
  });

  const [thisRepresentante, setThisRepresentante] = useState<
    Representantes_INT | undefined
  >({
    cedula: 0,
    nombres: "",
    apellidos: "",
    sexo: "",
  });

  const Pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );
  const Representantes: Array<Representantes_INT> = useSelector(
    (state: RootState) => state.Representantes.Representante
  );

  useEffect(() => {
    const findPaciente = Pacientes.find(
      (paciente) => paciente.id_paciente === id_paciente
    );
    setThisPaciente(findPaciente);

    const findRepresentante = Representantes.find(
      (repre) => repre.cedula === findPaciente?.id_representante
    );
    setThisRepresentante(findRepresentante);
  }, [Pacientes, Representantes, id_paciente]);

  return (
    <>
      {thisPaciente ? (
        <>
          <CardDetallePaciente
            thisPaciente={thisPaciente}
            thisRepresentante={thisRepresentante}
          />
        </>
      ) : (
        <Empty description="Selecciona algun paciente." />
      )}
    </>
  );
}
