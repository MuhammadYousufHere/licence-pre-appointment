import React, { FC } from "react";
import "./tableStyles.scss";

//array of strings
export type TableHeadings = string[];

export interface tableBody {
  select?: React.ReactNode | JSX.Element | string;
  time?: string;
  available?: number | string;
  booked?: number | string;
}
export type Data = {
  tableHeadings: TableHeadings;
  tableBody: tableBody[];
};

type TableProps = {
  title: string;
  subtitle?: string;
  date?: string;
  data: Data;
  selectedTime: (time: string | undefined) => void;
};

const EditableTable: FC<TableProps> = ({
  title,
  subtitle,
  date,
  data,
  selectedTime,
}) => {
  const [selected, setSelected] = React.useState<string | undefined>("");
  const onSelectHandler = (time: string | undefined) => {
    setSelected(time);
  };
  return (
    <div className="container">
      <div className="container__headings">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
        <p className="subtitle">{date}</p>
      </div>

      <table>
        <thead>
          <tr>
            {data.tableHeadings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.tableBody.map(({ select, time, available, booked }, i) => (
            <tr key={time}>
              <td>
                <div
                  className={`select ${selected === time && "active"}`}
                  onClick={() => {
                    onSelectHandler(time);
                    selectedTime(time);
                  }}
                >
                  {select}
                </div>
              </td>
              <td>{time}</td>
              <td>{available}</td>
              <td>{booked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
