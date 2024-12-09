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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

export function Bid(): JSX.Element {
  const [bidAddress, setBidAddress] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [auctionContract, setAuctionContract] = useState<any>(null);
  const [auctionContractAddr, setAuctionContractAddr] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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

  async function submitBid(): Promise<void> {
    const auctionContract = await fetchExistingAuctionContract(bidAddress);
    if (!active || !signer || !auctionContract) return;

    try {
      const auction = auctionContract.connect(signer);
      const bidTxn = await auction.placeBid({
        value: ethers.utils.parseEther(bidAmount),
      });
      await bidTxn.wait();
      setSuccessMessage("Bid submitted successfully!");
      setSnackbarOpen(true)
    } catch (error: any) {
      setErrorMessage(`Error submitting bid: ${error.message}`);
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
        <StyledLabel>Your Bid Address:</StyledLabel>
        <StyledInput
          type="text"
          value={bidAddress}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBidAddress(e.target.value)
          }
        />

        <StyledLabel>Your Bid Amount:</StyledLabel>
        <StyledInput
          type="number"
          step="0.01"
          pattern="\d+(\.\d{0,2})?"
          value={bidAmount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBidAmount(e.target.value)
          }
        />

        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "120px" }}
              onClick={submitBid}
            >
              Submit Bid
            </Button>
          </Grid>
        </Grid>
      </StyledAuctionInputDiv>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={10}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={"success"}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
