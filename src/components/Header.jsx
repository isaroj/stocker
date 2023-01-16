import {
  Navbar,
  NavbarBrand,
} from "reactstrap";

import logo from '../assets/sensibull_logo.jpg'


const Header = () => {

  return (
    <div>

      <Navbar expand="md" className="bg-dark">
        <NavbarBrand className="text-white" href="/">
          <img src={logo} width="28rem"/>Senisbull
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;
