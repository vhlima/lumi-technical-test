import { Stack } from "@mui/material";

import {
  SupervisorAccount,
  Receipt,
  AttachMoney,
  MonetizationOn,
} from "@mui/icons-material";

import InfoCard from "../InfoCard";
import { useEffect, useState } from "react";
import { ClientProfile } from "../../../../interfaces";
import { FindClientProfileService } from "../../../../services";

const InfoCardList: React.FC = () => {
  const [clientProfile, setClientProfile] = useState<ClientProfile>();

  useEffect(() => {
    (async () => {
      const findClientProfileService = new FindClientProfileService();
      const clientProfileResponse = await findClientProfileService.execute();
      setClientProfile(clientProfileResponse);
    })();
  }, []);

  return (
    <Stack
      sx={{ marginBottom: 4 }}
      direction={{ xs: "column", md: "row" }}
      spacing={1}
    >
      <InfoCard
        title="Invoices"
        description="Total amount of invoices registered"
        value={String(clientProfile?.invoiceCount || 0)}
        icon={Receipt}
      />
      <InfoCard
        title="Total Price"
        description="Total price of invoices registered"
        value={`R$ ${clientProfile?.invoicesTotalPrice?.toFixed(2) || 0}`}
        icon={AttachMoney}
      />

      <InfoCard
        title="Average monthly price"
        description="Average monthly price for invoices"
        value={`R$ ${clientProfile?.averageMonthlyPrice?.toFixed(2) || 0}`}
        icon={MonetizationOn}
      />
    </Stack>
  );
};

export default InfoCardList;
