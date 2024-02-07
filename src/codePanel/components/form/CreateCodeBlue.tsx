import { Input } from "../input/Input";

export const CreateCodeBlue = () => {
  return (
    <form className="bg-white grid grid-cols-2 md:grid-cols-3  gap-3 p-2 rounded">
      <Input
        type="datetime-local"
        id="datepicker"
        className="p-2 border rounded w-full"
      />
      <select
        name=""
        id=""
        className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border"
      >
        <option disabled selected>
          Seleccionar equipo
        </option>
        <option value="">Urgencia</option>
        <option value="">Uci</option>
        <option value="">Uci Pediatrica</option>
      </select>
      <Input type="text" placeholder="Ubicación" />
      <Input
        type="text"
        placeholder="Nombre funcionario/a"
        className="p-2 border rounded w-full"
      />
      <Input
        type="text"
        placeholder="Operador"
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
      >
        Crear
      </button>
    </form>
  );
};
