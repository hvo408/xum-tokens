pragma solidity ^0.6.0;

import "./Mock.sol";


contract MockXUMFragmentsPolicy is Mock {
    
    function rebase() external {
        emit FunctionCalled("XUMFragmentsPolicy", "rebase", msg.sender);
    }
}
