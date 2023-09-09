import React, { useState, useEffect } from "react";
import { Scanner, FormField, CustomButton, Navbar } from "../components";
import { useStateContext } from "../context";

const ScanShipment = () => {
  const [shipmentData, setShipmentData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { addShimpmentInfo, contract, address, upload } = useStateContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  }, []);

  const [form, setForm] = useState({
    description: "",
  });

  const handleScanResult = (result) => {
    setShipmentData(result);
    const parsedNum = parseInt(result);
    setNum(parsedNum);
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await addShimpmentInfo();

    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Scanner onScanResult={handleScanResult} />
      {shipmentData && (
        <div className="mt-[30px] backdrop-brightness-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {isLoading && "Loading..."}

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white ">
              You are updating details for NFT - {num}
            </span>
            <div className="flex justify-center items-center ">
              <FormField
                labelName="New details *"
                placeholder="Update info"
                inputType="text"
                value={form.description}
                handleChange={(e) => handleFormFieldChange("description", e)}
              />
            </div>
            <div className="flex flex-row gap-[50px]">
              <div>
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
                  Your Location Coordinates
                </span>
                <div className="mt-[15px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-white font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
                  <p className="text-black">Latitude : {latitude}</p>
                  <p className="text-black"> Longitude : {longitude}</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-[26px]">
                <CustomButton
                  btnType="submit"
                  title="Update Details"
                  styles="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScanShipment;
