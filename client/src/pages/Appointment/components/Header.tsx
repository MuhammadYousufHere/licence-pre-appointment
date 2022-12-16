import Card from "./Card";
import "./header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-body">
        <div className="logo">
          <img
            src="https://dls.sindhpolice.gov.pk/assets/images/logo.png"
            alt="logo"
          />
          <br />
          Online Pre-Appointment
        </div>
      </div>
    </div>
  );
};

export default Header;
