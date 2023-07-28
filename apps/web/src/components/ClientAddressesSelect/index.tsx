import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from "@mui/material";
import { useSession } from "../../hooks/useSession";

interface Props {
  sx?: SxProps<Theme>;
  id: string;
  label: string;
  value: string;
  onChange: (value?: string) => void;
}

const ClientAddressesSelect: React.FC<Props> = (props) => {
  const { id, sx, label, value, onChange } = props;

  const { client: session } = useSession();

  const installments = (session?.addresses || []).map(
    (address) => address.streetAddress
  );

  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={!value ? "default" : value}
        label={label}
        onChange={(e) => {
          const value = e.target.value as string;
          if (value === "default") {
            onChange(undefined);
          } else {
            onChange(value);
          }
        }}
      >
        <MenuItem value={"default"}>All installments</MenuItem>
        {Array.from(installments).map((installment) => (
          <MenuItem key={`installment-tab-${installment}`} value={installment}>
            {installment}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClientAddressesSelect;
