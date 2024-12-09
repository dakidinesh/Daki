import { SetStateAction, useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DutchAuction } from "./DutchAuction";
import { LookUp } from "./LookUp";
import { Bid } from "./Bid";
import { ActivateDeactivate } from "./ActivateDeactivate";
import ShowAddress from "./ShowAddress";

export default function Toggle() {
  const [activeComponent, setActiveComponent] = useState("dutch"); // Default to 'Dutch Auction'

  const handleComponentChange = (
    event: any,
    newComponent: SetStateAction<string> | null
  ) => {
    if (newComponent !== null) {
      setActiveComponent(newComponent);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-evenly', 
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '33%', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "2rem" }}>
            REVERSE BIDDING SYSTEM
          </Typography>
        </Box>
        <Box sx={{ width: '33%', paddingTop: '20px'}}>
          <ActivateDeactivate />
        </Box>
        <Box sx={{ width: '50%', textAlign: 'center', paddingTop:'20px' }}>
          <ToggleButtonGroup
            value={activeComponent}
            exclusive
            onChange={handleComponentChange}
            aria-label="component toggle"
            sx={{
            backgroundColor: 'white',
            '& .MuiToggleButton-root': {
              backgroundColor: 'white',
              color: "black",
              margin: '5px',
              borderRadius: '10px',
              borderWidth: '3px',
              height: '50px'
            },
            '& .MuiToggleButton-root.Mui-selected': {
              backgroundColor: 'orange',
              color: 'black'
            }
          }}
          >
            <ToggleButton value="dutch">
              Deploy
            </ToggleButton>
            <ToggleButton value="lookup">
              Lookup
            </ToggleButton>
            <ToggleButton value="bid">
              Bid
            </ToggleButton>
            <ToggleButton value="show-address">
              Show Address
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      

        
      </div>

      <Box
        border="1px solid #ccc"
        borderColor="#1b7db3" // Set border color to blue
        padding="20px"
        textAlign="center"
        mx="auto" // Center horizontally
        display="flex" // Use flexbox layout
        alignItems="center" // Center vertically
        justifyContent="space-between" // Space items evenly
        mt={5}
        borderRadius="30px" // Set border radius
      >
        {activeComponent === "dutch" && <DutchAuction />}
        {activeComponent === "lookup" && <LookUp />}
        {activeComponent === "bid" && <Bid />}
        {activeComponent==="show-address" && <ShowAddress/>}
      </Box>
    </>
  );
}
