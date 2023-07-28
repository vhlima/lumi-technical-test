import ConsumptionChart from "./components/ConsumptionChart";
import Section from "../Section";
import { useState } from "react";
import ChangeConsumptionFilter from "./components/ChangeConsumptionFilter";
import { useConsumptionFilter } from "./hooks/useConsumptionFilter";
import { Box } from "@mui/material";
import ClientAddressesSelect from "../../../../components/ClientAddressesSelect";

const ConsumptionSection: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("cost");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const { filters } = useConsumptionFilter();

  const currentValueInfo = filters[selectedValue as keyof typeof filters];

  return (
    <Section.Root>
      <Section.Title
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        title={`Consumption Chart (${currentValueInfo.label})`}
      >
        <ChangeConsumptionFilter
          onChange={(filter) => setSelectedValue(filter)}
        />
      </Section.Title>

      <Section.Content>
        <ClientAddressesSelect
          id="installmentFilter"
          label="Filter by Installment"
          value={selectedAddress}
          onChange={(value) => setSelectedAddress(value ? value : "")}
        />

        <Box sx={{ marginTop: 2 }}>
          <ConsumptionChart
            filter={
              selectedAddress
                ? (invoices) =>
                    invoices.filter(
                      (invoice) =>
                        invoice.address.streetAddress === selectedAddress
                    )
                : undefined
            }
            label={currentValueInfo.label}
            onValueIncrement={(invoice, value) =>
              selectedValue === "energySpent"
                ? (value += invoice.energySpent)
                : (value += invoice.price)
            }
          />
        </Box>
      </Section.Content>
    </Section.Root>
  );
};

export default ConsumptionSection;
