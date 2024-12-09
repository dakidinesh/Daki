import { useWeb3React } from "@web3-react/core";
import { Contract, ethers, Signer } from "ethers";
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import BasicDutchAuctionArtifact from "../artifacts/contracts/BasicDutchAuction.sol/BasicDutchAuction.json";
import { Provider } from "../utils/provider";
import { SectionDivider } from "./SectionDivider";
import { act } from "react-dom/test-utils";
import { Button, Grid } from "@mui/material";

const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

const StyledAuctionInputDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function LookUp(): JSX.Element {
  const [auctionContract, setAuctionContract] = useState<any>(null);
  const [auctionInfo, setAuctionInfo] = useState<any>(null);
  const [lookupAddress, setLookupAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [auctionContractAddr, setAuctionContractAddr] = useState<string>("");
  const [auctionName, setAuctionName] = useState<string>("");


  useEffect(() => {
    async function enableEthereum() {
      if ((window as any).ethereum) {
        try {
          await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          setActive(true);
          setSigner(
            new ethers.providers.Web3Provider(
              (window as any).ethereum
            ).getSigner()
          );
        } catch (error) {
          console.error(error);
        }
      }
    }

    enableEthereum();
  }, []);

  async function getAuctionInfo(address: string): Promise<void> {
    if (!active || !signer) return;

    try {
      const auctionContract = new ethers.Contract(
        address,
        BasicDutchAuctionArtifact.abi,
        signer
      );
      const winner = await auctionContract.highestBidder();
      const winningBid = await auctionContract.highestBid();
      const reservePrice = await auctionContract.reservePrice();
      const numBlocksAuctionOpen = await auctionContract.numBlocksAuctionOpen();
      const offerPriceDecrement = await auctionContract.offerPriceDecrement();
      const auctionName = await auctionContract.auctionName();
      const auctionOpen = await auctionContract.auctionEnded();

      setAuctionInfo({
        winner: winner,
        winningBid: winningBid.toString(10),
        reservePrice: reservePrice.toString(10),
        numBlocksAuctionOpen: numBlocksAuctionOpen.toString(10),
        offerPriceDecrement: offerPriceDecrement.toString(10),
        auctionOpen: !auctionOpen,
        auctionName: auctionName
      });
    } catch (error: any) {
      setErrorMessage(`Error retrieving auction info: ${error.message}`);
    }
  }

  async function refundBid(): Promise<void> {
    if (!active || !signer) return;
    try {
      const address = await signer.getAddress();
      const auction = await fetchExistingAuctionContract(lookupAddress);
      const tx = await auction.refundBid(address);
      await tx.wait();
      setSuccessMessage("Bid refunded successfully.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to refund bid.");
    }
  }

  async function fetchExistingAuctionContract(address: string): Promise<any> {
    if (!active || !signer) return;

    try {
      console.log("fetchExistingAuctionContract");
      const auctionContract = new ethers.Contract(
        address,
        BasicDutchAuctionArtifact.abi,
        signer
      );
      await setAuctionContract(auctionContract);
      await setAuctionContractAddr(address);
      return auctionContract;
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        `Error fetching existing auction contract: ${error.message}`
      );
      return null;
    }
  }

  return (
    <>
      <StyledAuctionInputDiv>
        <StyledLabel>Address of BasicDutchAuction:</StyledLabel>
        <StyledInput
          type="text"
          value={lookupAddress}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLookupAddress(e.target.value)
          }
        />

        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "120px" }}
              onClick={()=>{getAuctionInfo(lookupAddress)}}
            >
              Show Info
            </Button>
          </Grid>
        </Grid>
        {auctionInfo && (
          <>
            <StyledLabel>Auction Name: {auctionInfo.auctionName}</StyledLabel>
            <StyledLabel>Current Winner: {auctionInfo.winner}</StyledLabel>
            <StyledLabel>Highest Bid: {auctionInfo.winningBid/1000000000000000000 }</StyledLabel>
            <StyledLabel>Reserve Price: {auctionInfo.reservePrice/ 1000000000000000000}</StyledLabel>
            <StyledLabel>
              Number of Blocks Auction Open: {auctionInfo.numBlocksAuctionOpen}
            </StyledLabel>
            <StyledLabel>
              Offer Price Decrement: {auctionInfo.offerPriceDecrement/1000000000000000000}
            </StyledLabel>

            {auctionInfo.auctionOpen && <p>Auction is currently open.</p>}
            {!auctionInfo.auctionOpen && auctionInfo.winner && (
              <div>
                <p>Auction has ended.</p>
              </div>
            )}
          </>
        )}
      </StyledAuctionInputDiv>

      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </>
  );
}
