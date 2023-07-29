import { Tabs, Tab } from "@mui/material";
import { Invoice } from "../../../../interfaces";
import { useCallback, useMemo } from "react";

interface Props {
  invoices: Invoice[];
  onChange: (year: number) => void;
}

const YearsTab: React.FC<Props> = (props) => {
  const { invoices, onChange } = props;

  const findYears = useCallback(() => {
    const invoicesByYear = invoices.sort(
      (i1, i2) => i1.relativeYear - i2.relativeYear
    );

    const years: Record<number, number> = {};

    for (let i = 0; i < invoicesByYear.length; i++) {
      const invoice = invoicesByYear[i];
      years[invoice.relativeYear] = years[invoice.relativeYear]
        ? years[invoice.relativeYear] + 1
        : 1;
    }

    return years;
  }, [invoices]);

  const years = useMemo(() => findYears(), [findYears]);

  return (
    <Tabs
      value={Object.keys(years)[0]}
      onChange={(_, value) => onChange(value)}
    >
      {Object.entries(years).map(([year, count]) => (
        <Tab
          key={`year-tab-${year}`}
          value={year}
          label={`${year} (${count})`}
        />
      ))}
    </Tabs>
  );
};

export default YearsTab;
