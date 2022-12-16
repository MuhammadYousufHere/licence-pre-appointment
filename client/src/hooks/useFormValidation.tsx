import * as YUP from 'yup';

const useFormValidation = () => {
  const foreName = YUP.string().required('Forename(s) Required');
  const surname = YUP.string().required('Family Name/Surname required');
  const name = YUP.string().required('Name is required');
  const email = YUP.string().required().email();

  const country = YUP.string().required('Select Location');
  const mobileOperater = YUP.string().required('Select Mobile Operator');
  const mobileNum = YUP.string()
    .required('Mobile Number required')
    .min(10)
    .max(11);
  const password = YUP.string().required('Password required');

  const confirmPassword = YUP.string().oneOf(
    [YUP.ref('password'), null],
    'Passwords must match'
  );
  const captchacode = YUP.string().required('Please verify captcha');
  const code = YUP.string().required('Pin required');
  const cnic = YUP.string().required('CNIC required').max(13).min(13);
  const branch = YUP.string().required(
    'Please select branch you want to visit'
  );
  const licenceType = YUP.string().required('Please select licence type');
  const timeSlot = YUP.string().required('Please select time slot');
  const dealingCounter = YUP.string().required(
    'Please select dealing counter and time slot'
  );
  return {
    dealingCounter,
    foreName,
    branch,
    surname,
    name,
    licenceType,
    timeSlot,
    email,
    country,
    mobileOperater,
    mobileNum,
    password,
    confirmPassword,
    captchacode,
    code,
    cnic,
  };
};

export default useFormValidation;
