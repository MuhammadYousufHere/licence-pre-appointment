import React, { FC } from "react";
import "./licenceType.scss";

type LicenceTypes = {
  id: number;
  name: string;
};
type LicenceTypeProps = {
  selectedType: (type: string | undefined) => void;
  licenceTypes: LicenceTypes[];
};
const LicenceType: FC<LicenceTypeProps> = ({ licenceTypes, selectedType }) => {
  const [selected, setSelected] = React.useState<string | undefined>("");
  const onSelectHandler = (type: string | undefined) => {
    setSelected(type);
  };
  return (
    <div className="licence-type-container">
      <div className="licence_type_body">
        <div className="licence_type_body_header">
          <h3 className="title">Select Driving Licence Type</h3>
        </div>
        <div className="licence_type_body_content">
          {licenceTypes.map((licence) => (
            <div
              key={licence.id}
              className={`licence_type_body_content_item ${
                selected === licence.name && "selected"
              }`}
              onClick={() => {
                onSelectHandler(licence.name);
                selectedType(licence.name);
              }}
            >
              <p>{licence.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LicenceType;
