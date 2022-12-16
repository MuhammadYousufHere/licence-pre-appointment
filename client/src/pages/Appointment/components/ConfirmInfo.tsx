import { FC } from "react";
import "./confirmInfo.scss";
import EditableTable from "./Table";
const data = [{ id: 1, name: "Driving Licence" }];
type ConfirmProps = {
  values: {
    name: string;
    cnic: string | number;
    dealingTime: string;
    mobile: string | number;
    branch: string;
    licenceType: string;
    counter: string | number;
    bookingFor: string;
    timeSlot: string;
  };
};
const SeatSlot: FC<ConfirmProps> = ({ values }) => {
  return (
    <div className="confirm_container">
      <div className="confirm_body">
        <div className="confirm_body_header">
          <h3 className="title">Please Confirm Pre-Appointment Details</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered" id="tableOne3">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <p>{values.name}</p>
                </td>
              </tr>
              <tr>
                <td>CNIC</td>
                <td>
                  <p>{values.cnic}</p>
                </td>
              </tr>
              <tr>
                <td>Booking For</td>
                <td>
                  <p>{values.bookingFor}</p>
                </td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <p>{values.timeSlot} Hours</p>
                </td>
              </tr>
              <tr>
                <td>Dealing Time</td>
                <td>
                  <p>{values.dealingTime}</p>
                </td>
              </tr>
              <tr>
                <td>Counter</td>
                <td>
                  <p> {values.counter}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <b>License Type</b>
                </td>
                <td>
                  <p>{values.licenceType}</p>
                </td>
              </tr>
              <tr>
                <td>Branch</td>
                <td>
                  <p>{values.branch}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeatSlot;
