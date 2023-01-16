import {
  Navbar,
  NavbarBrand,
} from "reactstrap";

import { FaFire } from "react-icons/fa";


const Header = () => {

  return (
    <div>

      <Navbar expand="md" className="bg-dark">
        <NavbarBrand className="text-white" href="/">
          Senisbull <FaFire className="text-warning" />
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;
