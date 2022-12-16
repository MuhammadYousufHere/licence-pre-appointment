import { FC, useState } from "react";
import "./seatSlot.scss";
import { MdOutlineEventAvailable } from "react-icons/md";
export type Slots = {
  id: number;
  available: boolean;
  slotTime: string;
};
type SeatSlotProps = {
  selectedSlot: (slot: string | undefined) => void;
  slotsData: Slots[];
  counter: number | string;
};
const SeatSlot: FC<SeatSlotProps> = ({ selectedSlot, slotsData, counter }) => {
  const [selected, setSelected] = useState<string | undefined>("");
  const onSelectHandler = (type: string | undefined) => {
    setSelected(type);
  };
  return (
    <div className="slot_container">
      <div className="slot_body">
        <div className="slot_body_header">
          <h3 className="title">Select Slot:</h3>
          <p className="title">11-12 Hours</p>
        </div>
        <div className="counters-container">
          <div className="slot_body_content">
            <div className="licence_type_body_content_item">
              <p>Counter {counter}</p>
            </div>
            {slotsData.map((slot) => (
              <div
                key={slot.id}
                className={`licence_type_body_content_item ${
                  selected === slot.slotTime && "selected"
                }`}
                onClick={() => {
                  onSelectHandler(slot.slotTime);
                  selectedSlot(slot.slotTime);
                }}
              >
                <div className="item">
                  <MdOutlineEventAvailable
                    className={slot.available ? "available" : "unavailable"}
                  />
                  <p>
                    {slot.slotTime}# {counter}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="slot_body_content">
            <div className="licence_type_body_content_item">
              <p>Counter {+counter + 1}</p>
            </div>
            {slotsData.map((slot) => (
              <div
                key={slot.id}
                className={`licence_type_body_content_item ${
                  selected === slot.slotTime && "selected"
                }`}
                onClick={() => {
                  onSelectHandler(slot.slotTime);
                  selectedSlot(slot.slotTime);
                }}
              >
                <div className="item">
                  <MdOutlineEventAvailable
                    className={slot.available ? "available" : "unavailable"}
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
  );
};

export default SeatSlot;
