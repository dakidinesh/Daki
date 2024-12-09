// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicDutchAuction {
    address payable public seller;
    uint256 public reservePrice;
    uint256 public numBlocksAuctionOpen;
    uint256 public offerPriceDecrement;
    uint256 public initialPrice;
    uint256 public startBlock;
    uint256 public endBlock;
    bool public auctionEnded;
    bool public itemSold;
    address public highestBidder;
    uint256 public highestBid;
    string public auctionName;

    mapping(address => uint256) public bids;

    event BidPlaced(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);
    event BidRefunded(address bidder, uint256 amount);

    constructor(
        uint256 _reservePrice,
        uint256 _numBlocksAuctionOpen,
        uint256 _offerPriceDecrement,
        string memory _auctionName
    ) {
        seller = payable(msg.sender);
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        initialPrice = reservePrice + numBlocksAuctionOpen * offerPriceDecrement;
        startBlock = block.number;
        endBlock = startBlock + numBlocksAuctionOpen;
        auctionEnded = false;
        itemSold = false;
        auctionName = _auctionName;
    }

    function placeBid() external payable {
        require(!auctionEnded, "Auction already ended");
        // require(!itemSold, "Item already sold");
        require(msg.value > 0, "Bid amount must be greater than 0");

        uint256 currentPrice = getCurrentPrice();
        require(msg.value >= highestBid, "Bid amount is below current highest Bid");

        // if (msg.value > highestBid) {
        if (highestBid != 0) {
            bids[highestBidder] += highestBid;
            // Refund the previous highest bidder's bid
            refundBid(highestBidder);
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        // } 
        // else {
        //     bids[msg.sender] += msg.value;
        //     if (bids[msg.sender] > highestBid) {
        //         highestBidder = msg.sender;
        //         highestBid = bids[msg.sender];
        //     }
        // }

        emit BidPlaced(msg.sender, msg.value);

        if (highestBid >= currentPrice) {
            endAuction();
        }
    }
 
    function endAuction() public {
        require(!auctionEnded, "Auction already ended");
        auctionEnded = true;
        itemSold = true;

        if (highestBidder != address(0)) {
            // uint256 refundAmount = bids[highestBidder];
            bids[highestBidder] = 0;  // Reset the highest bidder's bid amount

            // Refund the previous bids of the highest bidder
            // if (refundAmount > highestBid) {
            //     refundAmount -= highestBid;
            //     emit BidRefunded(highestBidder, refundAmount);
            //     payable(highestBidder).transfer(refundAmount);
            // }
            
            seller.transfer(highestBid);
            emit AuctionEnded(highestBidder, highestBid);
        } else {
            emit AuctionEnded(address(0), 0);
        }
    }

    function getCurrentPrice() public view returns (uint256) {
        uint256 currentBlock = block.number;
        // if (currentBlock <= startBlock) {
        //     return initialPrice;
        // }
        uint256 blocksElapsed = currentBlock - startBlock;
        uint256 priceDecrement = blocksElapsed * offerPriceDecrement;
        return initialPrice - priceDecrement;
    }

    function refundBid(address bidder) public {
        // require(auctionEnded, "Auction has not ended yet"); 
        // require(bidder != highestBidder, "Highest bidder cannot refund");
        require(bids[bidder] > 0, "No bid to refund");

        uint256 refundAmount = bids[bidder];
        bids[bidder] = 0;
        emit BidRefunded(bidder, refundAmount);
        payable(bidder).transfer(refundAmount);
    }
}
