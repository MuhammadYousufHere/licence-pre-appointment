import { Field } from "formik";
import { Input } from "../../components/Form";
import { MultistepFormWrapper, FormikStep } from "./MultistepFormWrapper";
import { object, number, mixed } from "yup";
import { ImClock } from "react-icons/im";
import EditableTable from "./components/Table";
import { Card } from "./components";
import { Data } from "./components/Table";
import LicenceType from "./components/LicenceType";
import Branch from "./components/Branch";
import SeatSlot from "./components/SeatSlot";
import ConfirmInfo from "./components/ConfirmInfo";
import PublicMessage from "./components/PublicMessage";
import Header from "./components/Header";
import InitialInfo from "./components/InitialInfo";
import FinalInfo from "./components/FinalInfo";
import Pagination from "./components/Pagination";
import { Button } from "../../components/common";
import "./appointmentStyles.scss";
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));
const data: Data = {
  tableBody: [
    {
      select: <ImClock />,
      time: "10:00",
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: "10:30",
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: "11:00",
      available: 2,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: "11:30",
      available: 0,
      booked: 4,
    },
    {
      select: <ImClock />,
      time: "12:00",
      available: 4,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: "12:30",
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: "1:00",
      available: 22,
      booked: 0,
    },
  ],
  tableHeadings: ["Select", "Time Slot", "Available", "Booked"],
};
const licenceTypes = [
  {
    id: 1,
    name: "Learner Driving Licence",
  },
  {
    id: 2,
    name: "Renewal of Driving Licence",
  },
  {
    id: 3,
    name: "International Driving Permit (IDP)",
  },
  {
    id: 4,
    name: "Permanent Driving Licence (PDL)",
  },
];
const branches = [
  { id: 1, name: "Korangi" },
  { id: 2, name: "DHA" },
  { id: 3, name: "Nazmabad" },
  { id: 4, name: "Landhi" },
  { id: 5, name: "Dadu" },
  { id: 6, name: "Badin" },
  { id: 7, name: "Sukker" },
];
const seatSlotData = [
  { available: false, id: 1, slotTime: "09:22" },
  { available: true, id: 2, slotTime: "09:44" },
  { available: false, id: 3, slotTime: "10:22" },
  { available: true, id: 4, slotTime: "10:32" },
  { available: true, id: 5, slotTime: "11:22" },
  { available: true, id: 6, slotTime: "12:22" },
];
const values = {
  name: "Muhammad Ali",
  cnic: "1234567890123",
  dealingTime: "10:00",
  mobile: "03001234567",
  branch: "Korangi",
  licenceType: "Learner Driving Licence",
  counter: "1",
  bookingFor: "18/12/2022",
  timeSlot: "10:00",
};
const Appointment = () => {
  return (
    <MultistepFormWrapper
      initialValues={{
        firstName: "",
        lastName: "",
        millionaire: false,
        money: 0,
        description: "",
      }}
      onSubmit={async (values) => {
        await sleep(3000);
        console.log("values", values);
      }}
    >
      <FormikStep label="Personal Data">
        <div>
          <Field name="firstName" label="First Name" />
        </div>
        <div>
          <Field name="lastName" component={Input} label="Last Name" />
        </div>
        <div>
          <Field
            name="millionaire"
            type="checkbox"
            component={Input}
            Label={{ label: "I am a millionaire" }}
          />
        </div>
      </FormikStep>
      <FormikStep
        label="Bank Accounts"
        validationSchema={object({
          money: mixed().when("millionaire", {
            is: true,
            then: number()
              .required()
              .min(
                1_000_000,
                "Because you said you are a millionaire you need to have 1 million"
              ),
            otherwise: number().required(),
          }),
        })}
      >
        <div>
          <Field
            name="money"
            type="number"
            component={Input}
            label="All the money I have"
          />
        </div>
      </FormikStep>
      <FormikStep label="More Info">
        <div>
          <Field name="description" component={Input} label="Description" />
        </div>
      </FormikStep>
    </MultistepFormWrapper>
  );
};

export default Appointment;
{
  /* <Header />
      <Card>
        <InitialInfo />

        <Branch
          branchesData={branches}
          selectedBranch={(branch) => console.log(branch)}
        />
        <LicenceType
          licenceTypes={licenceTypes}
          selectedType={(selected) => console.log(selected)}
        />
        <EditableTable
          title="Time Slot Availability"
          subtitle="Pre-Appointment for Next Day :"
          date="16-Dec-22"
          data={data}
          selectedTime={(s) => {
            console.log(s);
          }}
        />
        <SeatSlot
          counter={1}
          slotsData={seatSlotData}
          selectedSlot={(slot) => console.log(slot)}
        />
        <ConfirmInfo values={values} />
        <PublicMessage />
        <FinalInfo values={values} />
        <div className="action">
          <Button title="Next" variant="secondary" />
        </div>
        <Pagination />
      </Card> */
}
