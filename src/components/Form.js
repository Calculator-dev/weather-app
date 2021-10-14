import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react'
import InputForm from './InputForm';
import Location from './Location';
import PropTypes from "prop-types"

const Root = styled("div")({
    position: "relative",
    top: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    WebkitBoxShadow: "0 0 20px 7px rgba(0,0,0,0.2)",
    boxShadow: "0 0 20px 7px rgba(0,0,0,0.2)",
    backgroundColor: "#8AB6D6",
    width: "400px",
    height: "300px",
})

export default function Form({ location, canDelete, onDelete, onUpdate }) {

    return (
        <Root>
            {!location && <InputForm onUpdate={onUpdate} />}
            {location && <Location location={location} />}
            <Button style={{
                position: "absolute",
                left: "10px",
                bottom: "10px"
            }} variant="contained" color="error" disabled={!canDelete} onClick={onDelete}>Remove</Button>
        </Root>
    )
}

Form.propTypes = {
    location: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}