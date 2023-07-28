import { Stack } from "@mui/material";

import { Receipt, AttachMoney, MonetizationOn, Power } from "@mui/icons-material";

import InfoCard from "../InfoCard";
import { parseToBRL } from "../../../../../../utils/currency-parser";
import { useInvoiceList } from "../../../../hooks/useInvoiceList";

const InfoCardList: React.FC = () => {
  const { invoices } = useInvoiceList();

  const invoicesTotalPrice = invoices.reduce(
    (acc, item) => (acc += item.price),
    0
  );

  const energySpent = invoices.reduce((acc, invoice) => {
    return (acc += invoice.energySpent);
  }, 0);

  const averageMonthlyPrice = invoices.length > 0 ? invoicesTotalPrice / invoices.length : 0;

  return (
    <Stack
      sx={{ marginBottom: 4, marginTop: 2 }}
      direction={{ xs: "column", md: "row" }}
      spacing={1}
    >
      <InfoCard
        title="Energy Spent"
        description="Amount of energy spent from all invoices"
        value={`${energySpent} kWh`}
        icon={Power}
      />
      <InfoCard
        title="Invoices"
        description="Total amount of invoices registered"
        value={String(invoices.length)}
        icon={Receipt}
      />
      <InfoCard
        title="Total Cost"
        description="Total cost of invoices registered"
        value={parseToBRL(invoicesTotalPrice)}
        icon={AttachMoney}
      />
      <InfoCard
        title="Average Cost"
        description="Average monthly price for invoices"
        value={parseToBRL(averageMonthlyPrice)}
        icon={MonetizationOn}
      />
    </Stack>
  );
};

export default InfoCardList;
