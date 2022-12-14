import { Box } from '@mui/material';

const TabPanel = ({ children, tabNumber, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={tabNumber !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: '100' }}
    >
      {tabNumber === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
