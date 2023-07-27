import ConsumptionChart from "./components/ConsumptionChart";
import Section from "../Section";
import { useState } from "react";
import ChangeConsumptionFilter from "./components/ChangeConsumptionFilter";
import { useConsumptionFilter } from "./hooks/useConsumptionFilter";

const ConsumptionSection: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("cost");

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
        <ConsumptionChart
          label={currentValueInfo.label}
          onValueIncrement={(invoice, value) =>
            selectedValue === "energySpent"
              ? (value += invoice.energySpent)
              : (value += invoice.price)
          }
        />
      </Section.Content>
    </Section.Root>
  );
};

export default ConsumptionSection;
