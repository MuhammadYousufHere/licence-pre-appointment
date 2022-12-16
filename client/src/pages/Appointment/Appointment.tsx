import { MultistepFormWrapper, FormikStep } from './MultistepFormWrapper';
import { object } from 'yup';
import { ImClock } from 'react-icons/im';
import TimeSlotSelection from './components/TimeSlotSelection';
import { Card } from './components';
import { Data } from './components/TimeSlotSelection';
import LicenceType from './components/LicenceType';
import Branch from './components/Branch';
import SeatSlot from './components/SeatSlot';
import ConfirmInfo from './components/ConfirmInfo';
import PublicMessage from './components/PublicMessage';
import Header from './components/Header';
import InitialInfo from './components/InitialInfo';
import FinalInfo from './components/FinalInfo';
import './appointmentStyles.scss';
import { useFormValidation } from '../../hooks';
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));
export interface IntialValues {
  step_1: {
    name: string;
    mobile: string | number;
    cnic: string | number;
  };
  step_2: {
    branch: string;
  };
  step_3: { licenceType: string };
  step_4: {
    timeSlot: string;
  };
  step_5: {
    counter: string;
  };
}
const data: Data = {
  tableBody: [
    {
      select: <ImClock />,
      time: '10:00',
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: '10:30',
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: '11:00',
      available: 2,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: '11:30',
      available: 0,
      booked: 4,
    },
    {
      select: <ImClock />,
      time: '12:00',
      available: 4,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: '12:30',
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: '1:00',
      available: 22,
      booked: 0,
    },
  ],
  tableHeadings: ['Select', 'Time Slot', 'Available', 'Booked'],
};
const licenceTypes = [
  {
    id: 1,
    name: 'Learner Driving Licence',
  },
  {
    id: 2,
    name: 'Renewal of Driving Licence',
  },
  {
    id: 3,
    name: 'International Driving Permit (IDP)',
  },
  {
    id: 4,
    name: 'Permanent Driving Licence (PDL)',
  },
];
const branches = [
  { id: 1, name: 'Korangi' },
  { id: 2, name: 'DHA' },
  { id: 3, name: 'Nazmabad' },
  { id: 4, name: 'Landhi' },
  { id: 5, name: 'Dadu' },
  { id: 6, name: 'Badin' },
  { id: 7, name: 'Sukker' },
];
const seatSlotData = [
  { available: false, id: 1, slotTime: '09:22' },
  { available: true, id: 2, slotTime: '09:44' },
  { available: false, id: 3, slotTime: '10:22' },
  { available: true, id: 4, slotTime: '10:32' },
  { available: false, id: 5, slotTime: '11:22' },
  { available: true, id: 6, slotTime: '12:22' },
];
const finalValues = {
  name: 'Muhammad Ali',
  cnic: '1234567890123',
  dealingTime: '10:00',
  mobile: '03001234567',
  branch: 'Korangi',
  licenceType: 'Learner Driving Licence',
  counter: '1',
  bookingFor: '18/12/2022',
  timeSlot: '10:00',
};
const Appointment = () => {
  const validate = useFormValidation();
  const initialValues: IntialValues = {
    step_1: {
      name: '',
      mobile: '',
      cnic: '',
    },
    step_2: {
      branch: '',
    },
    step_3: {
      licenceType: '',
    },
    step_4: {
      timeSlot: '',
    },

    step_5: {
      counter: '',
    },
  };
  return (
    <>
      <Header />
      <Card>
        <MultistepFormWrapper
          initialValues={initialValues}
          onSubmit={async (values) => {
            await sleep(1000);
            console.log('values', values);
          }}
        >
          <FormikStep
            label='Personal Data'
            validationSchema={object().shape({
              step_1: object().shape({
                name: validate.name,
                mobile: validate.mobileNum,
                cnic: validate.cnic,
              }),
            })}
          >
            <InitialInfo />
          </FormikStep>
          <FormikStep
            label='Branch'
            validationSchema={object().shape({
              step_2: object().shape({
                branch: validate.branch,
              }),
            })}
          >
            <Branch branchesData={branches} />
          </FormikStep>
          <FormikStep
            label='Licence Types'
            validationSchema={object().shape({
              step_3: object().shape({
                licenceType: validate.licenceType,
              }),
            })}
          >
            <LicenceType licenceTypes={licenceTypes} />
          </FormikStep>
          <FormikStep
            label='Time Slot'
            validationSchema={object().shape({
              step_4: object().shape({
                timeSlot: validate.timeSlot,
              }),
            })}
          >
            <TimeSlotSelection
              title='Time Slot Availability'
              subtitle='Pre-Appointment for Next Day :'
              date='16-Dec-22'
              data={data}
            />
          </FormikStep>
          <FormikStep
            label='Seat Slot'
            validationSchema={object().shape({
              step_5: object().shape({
                counter: validate.dealingCounter,
              }),
            })}
          >
            <SeatSlot
              counter={1}
              slotsData={seatSlotData}
            />
          </FormikStep>
          <FormikStep label='Confirm Info'>
            <ConfirmInfo values={finalValues} />
          </FormikStep>
          <FormikStep label='Public Message'>
            <PublicMessage />
          </FormikStep>
          <FormikStep label='Final Info Info'>
            <FinalInfo values={finalValues} />
          </FormikStep>
        </MultistepFormWrapper>
      </Card>
    </>
  );
};

export default Appointment;
