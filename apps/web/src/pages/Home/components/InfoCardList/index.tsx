import { Stack } from "@mui/material";

import { SupervisorAccount, Receipt, AttachMoney, MonetizationOn } from "@mui/icons-material";

import InfoCard from "../InfoCard";

const InfoCardList: React.FC = () => {
  return (
    <Stack sx={{ marginBottom: 4 }} direction={{ xs: "column", md: "row" }} spacing={1}>
      <InfoCard
        title="Clients"
        description="Amount of clients registered"
        value="0"
        icon={SupervisorAccount}
      />
      <InfoCard
        title="Invoices"
        description="Total amount of invoices registered"
        value="0"
        icon={Receipt}
      />
      <InfoCard
        title="Total Price"
        description="Total price of invoices registered"
        value="R$ 0,00"
        icon={AttachMoney}
      />

      <InfoCard
        title="Average monthly price"
        description="Average monthly price for invoices"
        value="R$ 0,00"
        icon={MonetizationOn}
      />
    </Stack>
  );
};

export default InfoCardList;
