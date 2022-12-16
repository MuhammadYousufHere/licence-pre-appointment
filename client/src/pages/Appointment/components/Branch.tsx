import { useState, FC } from "react";
import { Dropdown } from "../../../components/Form";
import "./Branch.scss";
export interface IBranch {
  id: number;
  name: string;
}
type BranchProps = {
  selectedBranch: (branch: string | number | undefined) => void;
  branchesData: IBranch[];
};
const Branch: FC<BranchProps> = ({ branchesData, selectedBranch }) => {
  const [branch, setBranch] = useState("");
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
            id="branch"
            handleItemClick={(branch) => selectedBranch(branch)}
          />
        </div>
      </div>
    </div>
  );
};

export default Branch;
