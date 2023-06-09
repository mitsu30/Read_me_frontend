import { TextField } from '@mui/material';

export default function CustomTextField({ color, id, label, value, error, helperText, onChange, ...rest }) {
  return (
    <TextField
      color={color}
      margin="normal"
      fullWidth
      id={id}
      label={label}
      autoFocus
      value={value}
      error={error !== ''}
      helperText={helperText}
      onChange={onChange}
      {...rest}
    />
  );
};
