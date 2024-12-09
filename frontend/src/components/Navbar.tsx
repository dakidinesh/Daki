import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import {WalletStatus} from "./WalletStatus";


const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <WalletStatus />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
