import { useEffect, useState } from "react";
import { Invoice } from "../../../../../../interfaces";
import { ListInvoicesService } from "../../../../../../services";
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
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConsumptionChart: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    (async () => {
      const listInvoicesService = new ListInvoicesService();
      const invoicesResponse = await listInvoicesService.execute();
      setInvoices(invoicesResponse);
    })();
  }, []);

  /* Months label generator */
  const labels = Array.from({ length: 12 }).map((_, index) =>
    format(new Date(0, index + 1, 0), "MMM")
  );

  /*
    This function will group all the invoices from same month and sum the
    energy spent from each of them.
  */
  const convertInvoicesEnergySpent = (invoices: Invoice[]) => {
    const invoicesByMonth: number[] = [];

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];

      const date = new Date(invoice.relativeTo);
      if (date.getFullYear() !== new Date(Date.now()).getFullYear()) {
        continue;
      }

      const monthIndex = date.getMonth();

      invoicesByMonth[monthIndex] = invoicesByMonth[monthIndex]
        ? (invoicesByMonth[monthIndex] += invoice.energySpent)
        : invoice.energySpent;
    }

    return invoicesByMonth;
  };

  return (
    <Box>
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
              data: convertInvoicesEnergySpent(invoices),
              backgroundColor: "rgb(1, 41, 23)",
            },
          ],
        }}
      />
    </Box>
  );
};

export default ConsumptionChart;
