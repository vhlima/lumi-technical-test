import { Invoice } from "../../../../../../interfaces";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { useInvoiceList } from "../../../../hooks/useInvoiceList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  label: string;
  onValueIncrement: (invoice: Invoice, currentAmount: number) => number;
}

const ConsumptionChart: React.FC<Props> = (props) => {
  const { label, onValueIncrement } = props;

  const { invoices } = useInvoiceList();

  /* Months label generator */
  const labels = Array.from({ length: 12 }).map((_, index) =>
    format(new Date(0, index + 1, 0), "MMM")
  );

  /*
    This function will group all the invoices from same month and sum the
    current value from each of them using the onValueIncrement function.
  */
  const convertInvoicesToValue = (invoices: Invoice[]) => {
    const invoicesByMonth: number[] = [];

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];

      const date = new Date(invoice.relativeTo);
      if (date.getFullYear() !== new Date(Date.now()).getFullYear()) {
        continue;
      }

      const monthIndex = date.getMonth();

      invoicesByMonth[monthIndex] = onValueIncrement(
        invoice,
        invoicesByMonth[monthIndex] ? invoicesByMonth[monthIndex] : 0
      );
    }

    return invoicesByMonth;
  };

  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label,
            data: convertInvoicesToValue(invoices),
            backgroundColor: "rgb(1, 41, 23)",
          },
        ],
      }}
    />
  );
};

export default ConsumptionChart;
