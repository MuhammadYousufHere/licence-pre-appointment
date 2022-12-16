import { useFormikContext } from "formik";
import { useState, FC } from "react";
import { Dropdown } from "../../../components/Form";
import { IntialValues } from "../Appointment";
import "./Branch.scss";
export interface IBranch {
  id: number;
  name: string;
}
type BranchProps = {
  branchesData: IBranch[];
};
const Branch: FC<BranchProps> = ({ branchesData }) => {
  const [branch, setBranch] = useState("");
  const { setFieldValue, errors } = useFormikContext<IntialValues>();
  return (
    <div className="branch_container">
      <div className="licence_type_body">
        <div className="branch_body_header">
          <h3 className="title">Select Driving Licence Branch</h3>
        </div>
        <div className="branch_body_content">
          <Dropdown
            selectedItem={branch}
            setSelectedItem={setBranch}
            data={branchesData}
            id="step_2.branch"
            handleItemClick={(branch) => setFieldValue("step_2.branch", branch)}
            errorMessage={errors.step_2?.branch}
          />
        </div>
      </div>
    </div>
  );
};

export default Branch;
