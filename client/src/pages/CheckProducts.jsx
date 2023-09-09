import React, { useState, useEffect } from "react";
import { Navbar, Scanner } from "../components";
import { useStateContext } from "../context";
import { format } from "date-fns";

const CheckProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [shipmentData, setShipmentData] = useState("");
  const [num, setNum] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const { Search } = useStateContext();

  const fetchProduct = async () => {
    setIsLoading(true);
    console.log(num);
    const data = await Search(num);
    setInfo(data);
    setIsLoading(false);
    setDataFetched(true); // Update the state to indicate data has been fetched
  };

  const handleScanResult = (result) => {
    setShipmentData(result);
    const parsedNum = parseInt(result);
    setNum(parsedNum);
  };

  useEffect(() => {
    setDataFetched(false); // Reset the data fetched flag when num changes
    if (num !== null) {
      fetchProduct();
    }
  }, [num]);

  return (
    <div>
      <Navbar />
      <Scanner onScanResult={handleScanResult} />
      {dataFetched && ( // Only render if data has been fetched
        <div>
          <h1 className="font-epilogue font-medium text-[35px] leading-22 text-white text-center mt-[20px] backdrop-brightness-50 rounded-[10px] sm:p-10 p-4">
            NFT Details
          </h1>

          <div className="font-epilogue font-medium text-[14px] leading-[22px] text-white mt-[30px] backdrop-brightness-50 rounded-[10px] sm:p-10 p-4">
            <p>Token ID: {info.tokenId}</p>
            <p>MINTED BY: {info.manufacturer}</p>
            <p>Latitude: {info.location[0]}</p>
            <p>Longitude: {info.location[1]}</p>
            <p>Loyalty: {info.weight} </p>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckProducts;
