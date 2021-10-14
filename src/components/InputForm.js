import React from 'react'
import PropTypes from "prop-types"
import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    color: "white",
});

export default function InputForm({ onUpdate }) {

    const handleBlur = ev => onUpdate(ev.target.value)

    const handleKey = ev => {
        if (ev.key === "Enter") {
            onUpdate(ev.target.value)
        }
    }

    return (
        <CssTextField
            variant="outlined"
            style={{
                width: "260px",
                marginBottom: "20px"
            }}
            label="Enter Location"
            placeholder="Enter Your Location eg. London"
            autoFocus
            onBlur={handleBlur}
            onKeyDown={handleKey}
        />
    )
}

InputForm.propTypes = {
    onUpdate: PropTypes.func.isRequired,
}