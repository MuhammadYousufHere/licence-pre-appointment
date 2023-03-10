import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as YUP from "yup";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { operators } from "./helper";
import { useFormValidation, useCountryInfo } from "../../hooks";
import { ImageData } from "./Capture/Image";
import { Wrapper, Button } from "../../components/common";
import { HiUserPlus } from "react-icons/hi2";
import { Dropdown, Input } from "../../components/Form";
import Loader from "../../components/PreLoader/Loader";
import Alert from "./Alert";
import Footer from "../Footer";
import "./RegisterStyle.scss";
import ScrollToTop from "../../components/ScrollTop";
import DropdownSearch from "../../components/dropdown/dropdownSearch";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { clearUser, registerUser } from "../../features/slices/userSlice";
import Captcha from "../../components/Captcha";
import ImageCapture from "./Capture/Capture";
// import pic from "../../assets/1.jpeg";
// import pic1 from "../../assets/2.jpeg";
// import pic2 from "../../assets/3.jpeg";
// import pic3 from "../../assets/4.jpeg";
import { clearCaptcha } from "../../features/slices/captchaSlice";
type RegisterErrorResponse = {
  msg: string;
  msgStatus: number;
};
const Register = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrcs, setImgSrcs] = useState<ImageData[]>([]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      if (imgSrcs.length < 5) {
        setImgSrcs((prev) => [
          ...prev,
          { id: uuid(), img: imageSrc } as ImageData,
        ]);
        setFieldValue(
          "descriptions",
          imgSrcs.map((item) => item.img)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, setImgSrcs, imgSrcs]);
  const deleteHandler = (id: string | number) => {
    setImgSrcs((prev) => prev.filter((item) => item.id !== id));
  };
  const { countries, withPhoneCodes } = useCountryInfo();
  const validate = useFormValidation();
  const navigate = useNavigate();
  const { error, loading, registerUserObj } = useAppSelector(
    (state) => state.user
  );
  const { isSuccess } = useAppSelector((state) => state.captcha);
  const [errorLog, setError] = useState<RegisterErrorResponse>();

  const [countryCode, setCountryCode] = useState<string | undefined>("+92");
  const [country, setSelectedCountry] = useState("");
  const [mobileOperater, setMobileOperator] = useState("");
  const dispatch = useAppDispatch();
  const initialValues = {
    foreName: "",
    surname: "",
    email: "",
    mobileOperater,
    mobileNum: "",
    password: "",
    country: "",
    confirmPassword: "",
    captchaCode: "",
    descriptions: [],
  };

  // form control
  let formData = new FormData();
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues,
    onSubmit: (form) => {
      formData.append("foreName", form.foreName);
      formData.append("surname", form.surname);
      formData.append("email", form.email);
      formData.append("mobileOperater", form.mobileOperater);
      formData.append("mobileNum", form.mobileNum);
      formData.append("country", form.country);
      formData.append("password", form.password);
      // append images
      for (let i = 0; i < form.descriptions.length; i++) {
        formData.append("descriptions", form.descriptions[i]);
      }
      dispatch(registerUser(formData as any));
      setError(undefined);
      dispatch(clearCaptcha());
    },
    validationSchema: YUP.object().shape({
      foreName: validate.foreName,
      surname: validate.surname,
      email: validate.email,
      mobileOperater: validate.mobileOperater,
      mobileNum: validate.mobileNum,
      country: validate.country,
      password: validate.password,
      confirmPassword: validate.confirmPassword,
      captchaCode: validate.captchacode,
      descriptions: validate.images,
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });
  //

  // filter country codes
  const countryCodeHandler = (countryName: string) =>
    withPhoneCodes.find((c) => c.name === countryName && c)?.phoneCode;

  // dropdown handlers

  const handleCountryClick = (cName: string) => {
    setCountryCode(countryCodeHandler(cName));
    setFieldValue("country", cName);
  };
  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess) {
      setFieldValue("captchaCode", isSuccess);
    }
  }, [isSuccess, setFieldValue]);
  useEffect(() => {
    if (error.msg) {
      setError({ msg: error.msg, msgStatus: error.msgStatus });
    }
    if (registerUserObj?.status === 201) {
      toast(registerUserObj.msg, { type: "success" });
      resetForm();
      setTimeout(() => {
        navigate("/inprocess");
      }, 3000);
    }
  }, [dispatch, navigate, error, registerUserObj, resetForm]);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <>
      <Wrapper>
        <div className="row bottom-reg">
          <div className="left">
            <div className="row top-reg">
              <div className="left">
                <h1>Step 1</h1>
                <h3>Personal Information</h3>
              </div>
              <div className="right">
                <h1>Step 2</h1>
                <h3>Email/Mobile Varification</h3>
              </div>
            </div>
            <div className="register">
              <div className="bar"></div>
              <div className="register__content">
                <div className="icon">
                  <HiUserPlus />
                </div>
                <div className="register__content__title">
                  <h2>Registration</h2>
                </div>
                <div className="saperator"></div>

                <form onSubmit={handleSubmit}>
                  <div className="info">
                    <p>
                      Create an account to register yourself in Pak-Identity
                      System.
                    </p>
                    Or
                    <Link to="/login"> Signin with your existing account</Link>
                  </div>
                  <div className="log-error">
                    {errorLog?.msg && <ErrorMessage message={errorLog?.msg} />}
                  </div>
                  <Input
                    type="text"
                    name="foreName"
                    id="name"
                    label="Forname(S)"
                    value={values.foreName}
                    onChange={handleChange}
                    error={errors.foreName}
                  />
                  <Input
                    type="text"
                    name="surname"
                    id="surname"
                    label="Surname"
                    value={values.surname}
                    onChange={handleChange}
                    error={errors.surname}
                  />

                  <DropdownSearch
                    label="Country"
                    id="country"
                    dropDownData={countries}
                    dropDownItem={country}
                    setDropdownItem={setSelectedCountry}
                    selectedCountryName={(cName) => handleCountryClick(cName)}
                    error={errors.country}
                  />
                  <Alert />

                  <Dropdown
                    id="mobileOperater"
                    label="Mobile Operater"
                    selectedItem={mobileOperater}
                    handleItemClick={(OperatorName) =>
                      setFieldValue("mobileOperater", OperatorName)
                    }
                    data={operators}
                    errorMessage={errors.mobileOperater}
                    setSelectedItem={setMobileOperator}
                  />
                  <label htmlFor="mobile-num">Mobile No</label>
                  <div className="phonenum">
                    <div className="operator-code">
                      <p>{countryCode}</p>
                    </div>
                    <Input
                      type="tel"
                      name="mobileNum"
                      id="mobile-num"
                      value={values.mobileNum}
                      onChange={handleChange}
                      error={errors.mobileNum}
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Input
                    type={"password"}
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                  <Input
                    type={"password"}
                    name="confirmPassword"
                    id="re-password"
                    label="RE-TYPE YOUR PASSWORD"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                  <div className="images-capturerer">
                    <ImageCapture
                      ref={webcamRef}
                      onDelete={deleteHandler}
                      data={imgSrcs}
                      onCapture={capture}
                      error={errors.descriptions?.toString()}
                    />
                  </div>
                  <div className="captcha-part">
                    <div className="captcha">
                      <Captcha />
                      {errors.captchaCode && touched.captchaCode && (
                        <ErrorMessage message={errors.captchaCode} />
                      )}
                    </div>
                  </div>
                  <div className="saperator"></div>
                  <div className="submit">
                    <Button type="submit" title="Next" variant="secondary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right ">
            <div className="row top-reg hidden">
              <div className="left">
                <h1>Step </h1>
                <h3>Personal </h3>
              </div>
            </div>
            <main className="bottom_right">
              <div className="bar"></div>
              <div className="bottom_right__content">
                <h3>Mobile Number</h3>

                <p>Provide mobile number registered with PTA.</p>
                <h3>Password</h3>
                <p>
                  Password must be at least 8 characters and must contain an
                  upper case character, a lower case character, a numeric
                  character, and a special character.
                </p>
              </div>
            </main>
          </div>
        </div>
        <ToastContainer />
        <ScrollToTop smooth />
      </Wrapper>
      <div className="hidden-first">
        <Footer />
      </div>
    </>
  );
};

export default Register;
