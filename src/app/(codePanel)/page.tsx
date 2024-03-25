import { getAllCode } from "@/actions/codePanel/dashboard/getAllCode";
import { CardBar } from "@/components/chart/CardBar";
import { Title } from "@/components/ui/Title";

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default async function DashboardPage() {
  const { codeBlue, codeRed, CodeGreen, codeAir, codeLeak } =
    await getAllCode();

  const dataCodeBlue = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Azul",
        data: codeBlue,
        borderWidth: 1,
        backgroundColor: "#2196F3",
      },
    ],
  };

  const dataCodeRed = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Rojo",
        data: codeRed,
        borderWidth: 1,
        backgroundColor: "#F44336",
      },
    ],
  };

  const dataCodeGreen = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Verde",
        data: CodeGreen,
        borderWidth: 1,
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const dataCodeAir = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Aéreo",
        data: codeAir,
        borderWidth: 1,
        backgroundColor: "#0891B2",
      },
    ],
  };

  const dataCodeLeak = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Fuga",
        data: codeLeak,
        borderWidth: 1,
        backgroundColor: "#FFC107",
      },
    ],
  };

  return (
    <>
      <Title title="Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-slate-500">
        <CardBar data={dataCodeBlue} title="Codigo azul" />
        <CardBar data={dataCodeGreen} title="Codigo Verde" />
        <CardBar data={dataCodeRed} title="Codigo Rojo" />
        <CardBar data={dataCodeAir} title="Codigo Aéreo" />
        <CardBar data={dataCodeLeak} title="Codigo Fuga" />
      </div>
    </>
  );
}
