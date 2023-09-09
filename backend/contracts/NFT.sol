// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/interface/IERC721Supply.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage, IERC721Supply {
    uint256 private tokenIdCounter;

    event NFTCreated(uint256 tokenId);

    enum State {
        Idle,
        Ongoing,
        Distributed
    }

    struct Locate {
        string latitude;
        string longitude;
    }

    struct Lot_Token {
        uint256 tokenId;
        string nftName;
        address manufacturer;
        State status;
        Locate location;
        uint256 timestamp;
        uint256 loyalty;
        string image;
    }

    struct Distribution_Token {
        uint256 tokenId;
        address sender;
        uint256[] lotIds;
        string data;
        State state;
    }

    mapping(uint256 => Lot_Token) public allLots;
    mapping(uint256 => address) public ownerOfToken;

    constructor() ERC721("AppAvengers", "ANFT") {
        tokenIdCounter = 1;
    }

    function getLot(uint256 tokenId) public view returns (Lot_Token memory) {
        return allLots[tokenId];
    }

    function totalSupply() public view override returns (uint256) {
        return tokenIdCounter;
    }

    function createLotNFT(
        string memory _Name,
        string memory _image,
        uint256 _loyalty,
        string memory _lati,
        string memory _longi
    ) public {
        _mint(msg.sender, tokenIdCounter);
        allLots[tokenIdCounter] = Lot_Token(
            tokenIdCounter,
            _Name,
            msg.sender,
            State.Idle,
            Locate({latitude: _lati, longitude: _longi}),
            block.timestamp,
            _loyalty,
            _image
        );
        tokenIdCounter++;
    }

    function publishNFT(string memory _tokenURI) public {
        _setTokenURI(tokenIdCounter - 1, _tokenURI);

        emit NFTCreated(tokenIdCounter - 1);
    }

    // Helper function to convert uint256 to string
    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
