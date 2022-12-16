import { ReactNode, Children, useState, ReactElement } from "react";
import { Formik, FormikConfig, FormikValues, Form } from "formik";
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
      {({ isSubmitting, errors }) => (
        <Form autoComplete="off">
          {" "}
          <div>
            {childrenArray.map((child, index) => (
              <div key={child.props.label}>
                <div>{child.props.label}</div>
              </div>
            ))}
          </div>
          {currentChild}
          <main>
            {step > 0 ? (
              <div>
                <button
                  disabled={isSubmitting}
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                  type="button"
                >
                  Back
                </button>
              </div>
            ) : null}
            <div>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </button>
            </div>
          </main>
        </Form>
      )}
    </Formik>
  );
};
