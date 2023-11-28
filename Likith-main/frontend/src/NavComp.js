import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavComp=()=>{

return(<>

<Navbar bg="primary" data-bs-theme="dark">
<Container>
  <Navbar.Brand href="#home" className='text-bold'>Input Space Partioning</Navbar.Brand>
  {/* <Nav className="me-auto">
    <Nav.Link href="#home">Home</Nav.Link>
    <Nav.Link href="#features">Features</Nav.Link>
    <Nav.Link href="#pricing">Pricing</Nav.Link>
  </Nav> */}
</Container>
</Navbar>
</>)

}
export default NavComp;


