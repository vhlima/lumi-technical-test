import { Divider } from "@mui/material";
import { useInvoiceList } from "../../../Home/hooks/useInvoiceList";
import YearsTab from "../YearsTab";
import InvoicesList from "../InvoicesList";
import { useMemo, useState } from "react";

const Invoices: React.FC = () => {
  const { invoices } = useInvoiceList();

  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    invoices.length > 0 ? invoices[0].relativeYear : undefined
  );

  const invoicesFiltered = useMemo(
    () =>
      selectedYear
        ? invoices.filter((invoice) => invoice.relativeYear === selectedYear)
        : invoices,
    [invoices, selectedYear]
  );

  return (
    <>
      <YearsTab
        invoices={invoices}
        onChange={(year) => setSelectedYear(year)}
      />
      <Divider />

      <InvoicesList invoices={invoicesFiltered} />
    </>
  );
};

export default Invoices;
