import ConsumptionChart from "./components/ConsumptionChart";
import Section from "../Section";

const ConsumptionSection: React.FC = () => {

  return (
    <Section.Root>
      <Section.Title title="Consumption Chart (kWH)" />

      <Section.Content>
        <ConsumptionChart />
      </Section.Content>
    </Section.Root>
  );
};

export default ConsumptionSection;
