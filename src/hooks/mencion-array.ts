export function ArrayMencion(menciones: string): Array<string> {
  let pacientes: Array<string> = [];

  for (let i = 0; i < menciones.length; i++) {
    if (menciones[i].indexOf("@") !== -1) {
      let people = "";
      for (let j = 0; j < menciones.length; j++) {
        if (menciones[j + i].indexOf(" ") !== -1) {
          break;
        } else {
          people = people + menciones[j + i + 1];
        }
      }
      pacientes.push(people.replace(/^\s*|\s*$/g, ""));
    }
  }

  return pacientes;
}
