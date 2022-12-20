/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Webcam from "react-webcam";
import "./styles.scss";

import Image, { ImageData } from "./Image";
import uuid from "react-uuid";
import { IoCamera } from "react-icons/io5";
const ImageCapture = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrcs, setImgSrcs] = React.useState<ImageData[]>([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrcs((prev) => [
        ...prev,
        { id: uuid(), img: imageSrc } as ImageData,
      ]);
    }
  }, [webcamRef, setImgSrcs]);
  const deleteHandler = (id: string | number) => {
    setImgSrcs((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="capture-image">
      <div className="capture-image_body">
        <div className="capture-image_body_header">
          <p className="title">Please Capture an Image</p>
        </div>
        <main>
          <div className="camera-container">
            <Webcam
              audio={false}
              imageSmoothing={true}
              width={300}
              height={300}
              ref={webcamRef}
              videoConstraints={{
                facingMode: "user",
              }}
              screenshotFormat="image/jpeg"
            />
          </div>
          <div className="cam-action">
            <button type="button" className="capture" onClick={capture}>
              <IoCamera />
            </button>
          </div>

          <Image data={imgSrcs!} onDelete={deleteHandler} />
        </main>
      </div>
    </div>
  );
};

export default ImageCapture;
