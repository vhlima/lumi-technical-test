import ConsumptionChart from "./components/ConsumptionChart";
import Section from "../Section";
import { useState } from "react";
import ChangeConsumptionFilter from "./components/ChangeConsumptionFilter";
import { Box } from "@mui/material";

const ConsumptionSection: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("cost");

  const filters = {
    cost: {
      label: "Cost",
    },
    energySpent: {
      label: "Energy Spent",
    },
  };

  const currentValueInfo = filters[selectedValue as keyof typeof filters];

  return (
    <Section.Root>
      <Section.Title
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        title={`Consumption Chart (${currentValueInfo.label})`}
      >
        <ChangeConsumptionFilter
          filters={filters}
          onChange={(filter) => setSelectedValue(filter)}
        />
      </Section.Title>

      <Section.Content>
        <Box sx={{ marginTop: 2 }}>
          <ConsumptionChart
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
