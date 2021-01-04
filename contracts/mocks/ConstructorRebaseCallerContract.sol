pragma solidity 0.5.3;

import "../Orchestrator.sol";


contract ConstructorRebaseCallerContract {
    constructor(address orchestrator) public {
        // Take out a flash loan.
        // Do something funky...
        Orchestrator(orchestrator).rebase();  // should fail
        // pay back flash loan.
    }
}
