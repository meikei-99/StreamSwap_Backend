// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeDai is ERC20 {
    constructor() ERC20("fDAI Token", "fDAI") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}
