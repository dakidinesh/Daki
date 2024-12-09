import { ReactElement } from "react";
import styled from "styled-components";
import { ActivateDeactivate } from "./components/ActivateDeactivate";
import { DutchAuction } from "./components/DutchAuction";
import { SectionDivider } from "./components/SectionDivider";
// import { SignMessage } from "./components/SignMessage";
import { WalletStatus } from "./components/WalletStatus";
import Toggle from "./components/Toogle";
import Navbar from "./components/Navbar";
import { ContractProvider } from "./components/ContractContext";

const StyledAppDiv = styled.div`
    display: grid;
    grid-gap: 20px;
`;

export function App(): ReactElement {
    return (
        <ContractProvider>
            <StyledAppDiv>
                {/* <ActivateDeactivate /> */}
                {/* <SectionDivider /> */}
                {/* <WalletStatus /> */}
                {/* <SectionDivider /> */}
                {/* <SignMessage /> */}
                {/* <SectionDivider /> */}
                {/* <DutchAuction /> */}
                <Navbar/>
                <Toggle/>
            </StyledAppDiv>
        </ContractProvider>
    );
}
