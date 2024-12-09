===================================
         REVERSE BIDDING SYSTEM
===================================

**Team Members:**

- Dinesh Daki - 861345742
- Pavithra Halanayakanahalli Amaresh - 885155101
- Lakshmi Poojitha Lysetti - 885155077
- Sandeep Divakarni - 876253808
- Suchita Penubothu - 885165019

The Reverse Bidding System is a smart contract-based application that facilitates a reverse auction process for a single, physical item. Built on Ethereum, it ensures transparency, security, and efficiency in the bidding process.

-----------------------------------
         FEATURES
-----------------------------------
1. Dynamic Pricing:
   - The item's price decreases with every block until a bid is placed or the auction ends.
2. Secure Transactions:
   - Winning bid funds are immediately transferred to the seller.
3. Refunds for Non-Winning Bids:
   - Non-winning bidders are refunded automatically.
4. Event Notifications:
   - Emits events for critical actions like auction closure.

-----------------------------------
         HOW IT WORKS
-----------------------------------
1. Initialization:
   - The seller deploys the contract with the following parameters:
     - `minimumPrice`: The lowest amount the seller will accept.
     - `auctionDurationInBlocks`: Number of blocks the auction will remain active.
     - `priceDropPerBlock`: Amount by which the item's price decreases with each block.
   - The seller becomes the contract owner, and the auction begins upon deployment.

2. Price Calculation:
   - Initial price is computed as:
     startingPrice = minimumPrice + auctionDurationInBlocks * priceDropPerBlock

3. Bidding Process:
   - Participants place bids as the price dynamically decreases.
   - The first bid that matches or exceeds the current price wins.
   - Winning funds are transferred to the seller, and further bids are disallowed.
   - Non-winning bids are refunded immediately.

-----------------------------------
         FRONTEND SETUP
-----------------------------------
1. Navigate to the frontend directory:
   cd frontend

2. Install Node.js version 16.13.1:
   nvm install 16.13.1
   nvm use 16.13.1

3. Install dependencies:
   yarn
   yarn add ethers@^5.5.2
   yarn add react-scripts

4. Start the frontend server:
   yarn start

-----------------------------------
         BACKEND SETUP
-----------------------------------
1. Install Node.js version 18:
   nvm install 18
   nvm use 18

2. Install backend dependencies:
   yarn


-----------------------------------
       SMART CONTRACT SETUP
-----------------------------------
1. Install Hardhat:
   yarn add --dev hardhat
   OR
   npm install --save-dev hardhat

2. Add additional plugins and tools:
   npm install --save-dev \
   "@nomicfoundation/hardhat-network-helpers@^1.0.0" \
   "@nomiclabs/hardhat-etherscan@^3.0.0" \
   "@types/mocha@>=9.1.0" \
   "@typechain/ethers-v5@^10.1.0" \
   "@typechain/hardhat@^6.1.2" \
   "hardhat-gas-reporter@^1.0.8" \
   "ts-node@>=8.0.0" \
   "typechain@^8.1.0" \
   "typescript@>=4.5.0"

3. Compile the contract:
   yarn compile

4. Run a local blockchain node:
   yarn hardhat node

-----------------------------------
          TESTING
-----------------------------------
The contract includes comprehensive tests for:
- Proper contract initialization.
- Validation of bids and bid refunds.
- Transfer of funds to the seller on a successful bid.
- Rejection of bids after the auction ends.

To run the tests:
   yarn test

-----------------------------------
        PROJECT STRUCTURE
-----------------------------------
Reverse-Bidding-System/
├── frontend/        # React frontend code
├── backend/         # Backend API and server logic
├── contracts/       # Smart contract code
├── test/            # Unit and integration tests
├── hardhat.config.js# Hardhat configuration
└── README.md        # Project documentation

