import { FC } from "react";
import wa from "../../../assets/whatsapbtn.jpeg";
import "./finalInfo.scss";
interface FinalInfoProps {
  values?: any;
}
const FinalInfo: FC<FinalInfoProps> = ({ values }) => {
  return (
    <div className="finalinfo-container">
      <div className="finalinfo_body">
        <div className="finalinfo_body_header">
          <img src={wa} alt="whatsapp info" />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered" id="tableOne3">
            <tbody>
              <tr>
                <td>Token</td>
                <td>
                  <p className="token">505</p>
                </td>
              </tr>
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
                  <p className="danger">
                    Note: You will not be entertained after dealing time
                  </p>
                  <p className="danger">
                    مقرر ہ وقت گزرنے کے بعد آپکی درخواست پر مزید کاروائی نہین کی
                    جائے گی
                  </p>
                  <p className="danger">
                    توهانجو معاملو وقت کانپوءِ غور نه ڪيو ويندو
                  </p>
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
        <div className="extra-info">
          <p className="danger">
            Note: You will not be entertained without face mask and hand gloves
          </p>
          <p className="danger">
            چہرے پر ماسک اور دستانے پہنے بغیر آنے پر آپ کی درخواست پےغور نہیں
            کیا جائیگا
          </p>
          <p className="danger">
            ماسڪ ۽ دستانن کان بغیر اچڻ تي توھانجي درخواست تي غور نہ ڪیو ویندو
          </p>
          <h5 className="danger">
            Note: Two recent passport size photographs are required for
            International Driving Permit (IDP).
          </h5>
          <h5 className="danger">
            DLS, Pre-Appointment system live via Web/Andriod App, for the
            general public of Sindh to obtain next day booking for the process
            at desired slot with driving license Branch, serving Applicants
            under MVR Rules/SOPs, further Applicants are advised to ensure
            proper dress code, wearing of knicker/shorts by male Applicants is
            strictly prohibited during the process at Driving License Bracnhes
            of Sindh.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default FinalInfo;
