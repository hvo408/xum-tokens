pragma solidity 0.5.3;

import "./Mock.sol";


contract MockXUMFragmentsPolicy is Mock {
    
    function rebase() external {
        emit FunctionCalled("XUMFragmentsPolicy", "rebase", msg.sender);
    }
}
