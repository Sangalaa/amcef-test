import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header';


export default function App() {
  return (
      <Container maxWidth="md">
          <Header />
          <Typography>Hello World</Typography>
      </Container>
  );
}
