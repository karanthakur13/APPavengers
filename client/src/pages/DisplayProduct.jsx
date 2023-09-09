import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

const DisplayProduct = () => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address, contract, data, useNFTs } = useStateContext();

  const { data: nfts, isLoading: loading } = useNFTs(contract?.nft, {
    start: 0,
    count: 10,
  });

  console.log(data);

  return (
    <div>
      {nfts && nfts?.length > 0 && (
        <div>
          {nfts.map((nft) => (
            <div key={nft.metadata.id.toString()}>
              <h1>{nft.metadata.name}</h1>
              <ThirdwebNftMedia metadata={nft.metadata} />
              <p>owned by {nft.owner}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayProduct;
