import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { clearVerifyAppointment } from "../../features/slices/appointmentSlice";

import { Card } from "./components";
import FinalInfo from "./components/FinalInfo";
import Header from "./components/Header";
import "./success.scss";
const Success: FC = () => {
  const { verifyAppointment, loading } = useAppSelector(
    (state) => state.appointment
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {};
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <Card>
        <FinalInfo appointment={verifyAppointment} />
      </Card>
    </div>
  );
};

export default Success;
