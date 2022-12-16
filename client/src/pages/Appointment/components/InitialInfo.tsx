import { Input } from "../../../components/Form";
import Blinker from "./Blinker";
import "./initialInfo.scss";
const InitialInfo = () => {
  return (
    <div className="initial_info">
      <div className="initial_info_body">
        <div className="info_group">
          <label htmlFor="name" style={{ textAlign: "center" }}>
            <p>Name:</p>
            <Input
              name="name"
              id="name"
              value=""
              placeholder="please enter your name"
              onChange={() => console.log()}
            />
          </label>
        </div>
        <div className="info_group">
          <label htmlFor="mobile" style={{ textAlign: "center" }}>
            <p>
              <Blinker />
              Mobile Number (for SMS verification):
            </p>
            <Input
              name="mobile"
              id="mobile"
              value=""
              onChange={() => console.log()}
            />
          </label>
        </div>
        <div className="info_group">
          <label htmlFor="name" style={{ textAlign: "center" }}>
            <p>CNIC:</p>
            <Input
              name="cnic"
              id="cnic"
              value=""
              onChange={() => console.log()}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default InitialInfo;
