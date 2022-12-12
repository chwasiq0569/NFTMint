// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyToken is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;


    constructor() ERC721("Token Test", "MTK") {}

    function mintNFT(address receipent, string memory tokenURI) public onlyOwner returns(uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receipent, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
