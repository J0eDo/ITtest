import { createMuiTheme } from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#607d8b',
      remote: grey[800],
    },
    secondary: {
      main: '#b2dfdb',
    },
  },
});

export default theme