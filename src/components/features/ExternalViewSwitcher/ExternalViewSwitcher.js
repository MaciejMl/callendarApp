import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';

const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label='Views'
    style={{ flexDirection: 'row' }}
    name='views'
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value='Day' control={<Radio />} label='Day' />
    <FormControlLabel value='Week' control={<Radio />} label='Week' />
    <FormControlLabel value='Month' control={<Radio />} label='Month' />
  </RadioGroup>
);

export default ExternalViewSwitcher;
