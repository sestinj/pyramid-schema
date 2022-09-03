// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pyramid {
    
    // Total Contribution
    uint256 public total;

    // Total rewards earned
    uint256 public earned;
    
    // Contribution in current layer
    uint256 public current_layer_total;
    
    // Index of current layer
    uint16 public current_layer;
    
    // Initial*2^i, precomputed layer caps
    uint256[] layer_caps;
    
    constructor() {
        // Precompute layer caps
        uint256 cap = 1;
        for (uint i = 0; i < 255; i++) {
            layer_caps.push(cap);
            cap *= 2;
        }
    }
    
    // Contribution contains layer, contributor address, and amount of contribution
    struct Contribution {
        uint16 layer;
        address contributor;
        uint256 amount;
    }
    
    // Mapping from address to contribution, only one can be made per address
    mapping(address => Contribution) public contribution_list;
    
    // Array of contributions for each layer
    mapping(uint16 => Contribution[]) public layers;
    
    /**
     * @dev Get balance of the contract
     **/
     function getBalance() public view returns (uint256) {
         return address(this).balance;
     }
    
    /**
     * @dev Add money to pool, calculate and deliver on any paybacks
     * @param amount amount to be contributed
     **/
    function contribute(uint256 amount) payable public {
        // Require that the contribution amount matches the transaction value, otherwise we will end up in a situation unable to pay back the sender.
        require(amount == msg.value, "Contribution amount does not match the transaction value.");

        // An address can only contribute once
        require(contribution_list[msg.sender].amount == 0, "Sender has already made a contribution. No more can be made.");
        
        // Increment totals
        total += amount;
        current_layer_total += amount;
        
        // Check for layer caps being met
        while (current_layer_total >= layer_caps[current_layer]) {
            // Iterate over all contributions to the completed layer
            Contribution[] memory contributions = layers[current_layer];
            for (uint i = 0; i < contributions.length; i++) {
                Contribution memory past_contribution = contributions[i];
                // Pay back the address of each contribution by double
                (bool sent,) = past_contribution.contributor.call{value: past_contribution.amount*2}("");
                require(sent, "Failed to pay back address.");
                earned += past_contribution.amount*2;
            }
            
            // Update to indicate status for next layer
            current_layer_total -= layer_caps[current_layer];
            current_layer ++;
        }
        
        // Create the Contribution object
        // Might be an issue that someone could contribute to complete multiple layers but their contribution is consdiered as only part of a single layers
        Contribution memory contribution = Contribution(current_layer, msg.sender, amount);
        contribution_list[msg.sender] = contribution;
        layers[current_layer].push(contribution);
        
    }
    
    /**
     * @dev returns contribution remaining until payback for sender
     * @return remaining contribution until sender payback
     **/
    function viewProgress() public view returns (uint256) {
        uint16 layer = contribution_list[msg.sender].layer;
        if (layer == current_layer) {
            return layer_caps[layer] - current_layer_total;
        }
        return 0;
    }
}