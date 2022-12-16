import { FC, useState } from 'react';
import { useFormikContext } from 'formik';
import { IntialValues } from '../Appointment';
import { MdOutlineEventAvailable } from 'react-icons/md';
import './seatSlot.scss';
import ErrorMessage from '../../../components/Form/ErrorMessage';

export type Slots = {
  id: number;
  available: boolean;
  slotTime: string;
};
type SeatSlotProps = {
  slotsData: Slots[];
  counter: number | string;
};
const SeatSlot: FC<SeatSlotProps> = ({ slotsData, counter }) => {
  const { setFieldValue, errors, values } = useFormikContext<IntialValues>();

  const [selected, setSelected] = useState<string | undefined>(
    values.step_5.counter
  );
  const onSelectHandler = (type: string | undefined) => {
    setSelected(type);
  };
  return (
    <>
      <div className='slot_container'>
        <div className='slot_body'>
          <div className='slot_body_header'>
            <h3 className='title'>Select Slot:</h3>
            <p className='title'>11-12 Hours</p>
          </div>
          <div className='counters-container'>
            <div className='slot_body_content'>
              <div className='licence_type_body_content_item'>
                <p>Counter {counter}</p>
              </div>
              {slotsData.map((slot) => (
                <div
                  key={slot.id}
                  className={`licence_type_body_content_item ${
                    selected === slot.slotTime && 'selected'
                  }`}
                  onClick={() => {
                    onSelectHandler(slot.slotTime);
                  }}
                >
                  <div className='item'>
                    <MdOutlineEventAvailable
                      className={slot.available ? 'available' : 'unavailable'}
                    />
                    <p>
                      {slot.slotTime}# {counter}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='slot_body_content'>
              <div className='licence_type_body_content_item'>
                <p>Counter {+counter + 1}</p>
              </div>
              {slotsData.map((slot) => (
                <div
                  key={slot.id}
                  className={`licence_type_body_content_item ${
                    selected === slot.slotTime && 'selected'
                  }`}
                  onClick={() => {
                    onSelectHandler(slot.slotTime);
                    setFieldValue(
                      'step_5.counter',
                      `${slot.slotTime} # ${counter}`
                    );
                  }}
                >
                  <div className='item'>
                    <MdOutlineEventAvailable
                      className={slot.available ? 'available' : 'unavailable'}
                    />
                    <p>
                      {slot.slotTime}# {counter}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {errors.step_5?.counter && (
        <ErrorMessage message={errors.step_5.counter} />
      )}
    </>
  );
};

export default SeatSlot;
