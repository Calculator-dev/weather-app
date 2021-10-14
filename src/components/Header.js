import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import logo from "../assets/weather.png"

const Root = styled("div")({
    background: "#142850",
    width: "100%",
    display: "flex",
    justifyConten: "center",
    alignItems: "center",
    padding: "10px"
})

const Logo = styled("img")({
    width: "50px",
    height: "50px",
    marginRight: "15px"
})

const AppName = styled(Typography)({
    color: "white",
    fontWeight: "700",
    fontSize: "15px"
})

export default function Header() {
    return (
        <Root>
            <Logo src={logo} alt="weather" />
            <AppName variant="button" display="block">
                Weather App
            </AppName>
        </Root>
    )
}
