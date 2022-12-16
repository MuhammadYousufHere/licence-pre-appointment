import { ReactNode, Children, useState, ReactElement } from "react";
import { Formik, FormikConfig, FormikValues, Form } from "formik";
import Pagination from "./components/Pagination";
import { Button } from "../../components/common";
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}
interface MultistepFormWrapperProps {
  children: ReactNode;
}
export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}
export const MultistepFormWrapper = ({
  children,
  ...props
}: MultistepFormWrapperProps & FormikConfig<FormikValues>) => {
  const childrenArray = Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  const handleNext = (
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  ) => {
    if (isLastStep()) {
      setCompleted(true);
    } else {
      setStep((s) => s + 1);
    }
  };
  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form autoComplete="off">
          {" "}
          <div>
            {childrenArray.map((child, index) => (
              <div key={child.props.label}>
                {/* <div>{child.props.label}</div> */}
              </div>
            ))}
          </div>
          {currentChild}
          <main
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {step > 0 ? (
              <div className="action-btns">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={() => setStep((s) => s - 1)}
                  type="button"
                  title="Back"
                />
              </div>
            ) : null}
            <div>
              <Button
                disabled={isSubmitting}
                variant="secondary"
                type="button"
                onClick={() => handleNext(handleSubmit)}
                title={
                  isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"
                }
              />
            </div>
          </main>
          <Pagination />
        </Form>
      )}
    </Formik>
  );
};
