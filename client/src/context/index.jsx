import React, { useContext, createContext, useState } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useStorageUpload,
  useNFTs,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xC7920002aC28A612a375C540432e5f8C5696a28E"
  );

  const address = useAddress();
  const connect = useMetamask();

  const { mutateAsync: newItem } = useContractWrite(contract, "createLotNFT");
  const { mutateAsync: getLot } = useContractWrite(contract, "getLot");

  const { mutateAsync: upload } = useStorageUpload();

  const createnewItem = async (form, latitude, longitude) => {
    const data = await newItem({
      args: [form.pname, form.certificate, form.weight, latitude, longitude],
    });

    return data;
  };

  const Search = async (_token) => {
    const token = await getLot({
      args: [_token],
    });
    const parsedToken = {
      tokenId: parseInt(token.tokenId),
      grainName: token.grainName,
      manufacturer: token.manufacturer,
      status: parseInt(token.status), // Assuming `status` is an integer in Solidity
      exceededTemp: parseInt(token.exceededTemp),
      location: [
        parseFloat(token.location.latitude),
        parseFloat(token.location.longitude),
      ], // Assuming location is an object with latitude and longitude
      timestamp: parseInt(token.timestamp),
      weight: parseInt(token.weight),
      image: token.image,
    };

    return parsedToken;
  };
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createnewItem,
        Search,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
