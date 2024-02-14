import { getAllCode } from "@/actions/codePanel/dashboard/getAllCode";
import { CardBar } from "@/codePanel/components/chart/CardBar";
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
  const { codeBlue, codeRed, CodeGreen, codeAir } = await getAllCode();

  const dataCodeBlue = {
    labels: labels,
    datasets: [
      {
        label: "Total de Código Azul",
        data: codeBlue,
        borderWidth: 1,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
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
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
        backgroundColor: "rgba(255, 206, 86, 0.2)",
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
      </div>
    </>
  );
}
