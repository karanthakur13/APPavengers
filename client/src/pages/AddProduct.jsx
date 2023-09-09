import React, { useState, useEffect } from "react";
import { FormField, CustomButton, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import QrCode from "qrcode";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createnewItem, contract, address, addShimpmentInfo, upload } =
    useStateContext();
  const [qrData, setQrData] = useState(null);
  const [url, setUrl] = useState("");

  const [form, setForm] = useState({
    pname: "",
    weight: "",
    certificate: "",
  });

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  }, []);

  const handleDownload = async () => {
    try {
      const response = await QrCode.toDataURL(60);
      console.log(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const generateQR = async () => {
    try {
      const response = await QrCode.toDataURL(qrData);
      setUrl(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (qrData) {
      generateQR(qrData);
    }
  }, [qrData]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await createnewItem(
      {
        ...form,
      },
      latitude,
      longitude
    );
    const num = data.receipt.events[0].args[2];
    const numAsString = num.toString();
    setQrData(numAsString);

    const dataToUpload = [
      {
        name: form.grainName,
        description: `Weight: ${
          form.weight
        } grams | Location: Lat ${latitude} Long ${longitude} | Date: ${currentDateTime.toLocaleDateString()}`,
        image: form.certificate,
        location: `Lat ${latitude} Long ${longitude}`,
        date: { currentDateTime },
      },
    ];

    setIsLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className="mt-[30px] backdrop-brightness-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && "Loading..."}

        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="NFT Name*"
              placeholder="App Avengers"
              inputType="text"
              value={form.pname}
              handleChange={(e) => handleFormFieldChange("pname", e)}
            />
            <FormField
              labelName="Loyalty Level"
              placeholder="30"
              inputType="number"
              value={form.weight}
              handleChange={(e) => handleFormFieldChange("weight", e)}
            />
          </div>
          <div className="flex justify-center items-center ">
            <FormField
              labelName="Authentication Certificate URL *"
              placeholder="Url here"
              inputType="url"
              value={form.certificate}
              handleChange={(e) => handleFormFieldChange("certificate", e)}
            />
          </div>

          <div className="flex flex-wrap gap-[90px] ">
            <div className="felx flex-col">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
                Your Location Coordinates
              </span>
              <div className="mt-[15px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-white font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
                <p className="text-black">Latitude : {latitude}</p>
                <p className="text-black"> Longitude : {longitude}</p>
              </div>
            </div>
            <div className="felx flex-col">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
                Log Details
              </span>
              <div className="mt-[15px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-white font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
                <p className="text-black">
                  Date: {currentDateTime.toLocaleDateString()}&nbsp;Time:{" "}
                  {currentDateTime.toLocaleTimeString()}
                </p>

                <p className="text-black"></p>
              </div>
            </div>
            <div className="felx flex-col">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
                Current User Address
              </span>
              <div className="mt-[15px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-white font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
                <p className="text-black">{address}</p>

                <p className="text-black"></p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-[26px] ">
            {
              <CustomButton
                btnType="submit"
                title="MINT NFT"
                styles="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
            }
          </div>
        </form>
        {qrData && (
          <div className="mt-[26px]">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white ">
              NFT Minted Successfully{" "}
            </span>
            <div className="flex justify-center items-center mt-[26px] ">
              <img src={url} alt="qrcode" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
