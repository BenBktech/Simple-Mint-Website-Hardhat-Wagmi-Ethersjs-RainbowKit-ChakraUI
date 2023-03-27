//SPDX-Licence-Identifier: MIT
pragma solidity 0.8.19;

import "erc721a/contracts/ERC721A.sol";

contract NFTIsERC721A is ERC721A {
    constructor() ERC721A("Alyra", "ALR") {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }
}