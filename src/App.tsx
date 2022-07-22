import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Header from './components/header';


export default function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <Typography>Hello World</Typography>
    </Container>
  );
}
