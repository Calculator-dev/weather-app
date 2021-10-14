import { Button, CssBaseline, Grid } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState, useMemo } from 'react'
import Header from './Header'
import AddIcon from '@mui/icons-material/Add';
import Form from './Form'

const Root = styled("div")({
    background: "white",
    textAlign: "center",
    minHeight: "100vh",

})

const AddLocation = styled(Button)({
    position: "fixed",
    bottom: "50px",
    right: "50px",
})

const GridContainer = styled(Grid)({
    margin: "0 40px 20px 20px"
})

const LOCAL_STORAGE_KEY = "locations";
function setLocalStorage(locations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

function getLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations ? JSON.parse(storedLocations) : [];
}

export default function Weather() {

    const [weatherLocations, setWeatherLocations] = useState(getLocalStorage());

    const AddClick = () => setWeatherLocations([...weatherLocations, ""])

    const updateLocations = locations => {
        setWeatherLocations(locations);
        setLocalStorage(locations);
    };

    const removeIndex = index => () => updateLocations(weatherLocations.filter((_, locationIndex) => locationIndex !== index));


    const updateIndex = index => updateLocation =>
        updateLocations(
            weatherLocations.map((location, locationIndex) => (locationIndex === index ? updateLocation : location))
        )

    const addOrRemove = useMemo(() => weatherLocations.every(location => location !== ""), [weatherLocations]);

    return (
        <Root>
            <Header />
            <Grid container >
                {weatherLocations.map((location, index) => (
                    <GridContainer key={location} item >
                        <Form
                            location={location}
                            canDelete={!location || addOrRemove}
                            onDelete={removeIndex(index)}
                            onUpdate={updateIndex(index)}
                        />
                    </GridContainer>
                ))}
            </Grid>
            <AddLocation
                onClick={AddClick}
                variant="contained"
                color="primary"
                disabled={!addOrRemove}
            >
                <AddIcon />
            </AddLocation>
            <CssBaseline />
        </Root>
    )
}
