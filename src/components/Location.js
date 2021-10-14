import { Avatar, CircularProgress, Tooltip, Typography } from '@mui/material'
import ErrorIcon from "@mui/icons-material/Error"
import React, { useState, useEffect, useMemo } from 'react'
import getLocationWeather from "./getLocationWeather";
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';
import PropTypes from "prop-types";

const LoadingIndicator = ({ isLoading }) => {
    return isLoading ? <CircularProgress /> : null;
}

const ErrorMessage = ({ apiError }) => {
    if (!apiError) return null;

    return (
        <>
            <ErrorIcon color="error" />
            <Typography color="error" variant="h6" >
                {apiError}
            </Typography>
        </>
    )
}

const WeatherDisplay = ({ weatherData }) => {
    const { temp, description, icon, windTransfrom, windSpeed } = useMemo(() => {
        const [weather] = weatherData.weather || [];
        return {
            temp: weatherData.main && weatherData.main.temp ? Math.round(weatherData.main.temp).toString() : "",
            description: weather ? weather.description : "",
            icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : "",
            windTransfrom: weatherData.wind ? weatherData.wind.deg - 90 : null,
            windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
        }

    }, [weatherData])

    return (
        <>
            {temp && <Typography variant="h6">{temp}&deg;C</Typography>}
            {icon && (
                <Tooltip title={description} aria-label={description}>
                    <Avatar style={{ height: "30px", width: "30px" }} alt={description} src={icon} />
                </Tooltip>
            )}
            {windSpeed > 0 && (
                <>
                    <Typography variant="h6">{`${windSpeed} km/h`}</Typography>
                    {windTransfrom !== null && (
                        <ArrowRightAltTwoToneIcon style={{ transofrm: `rotateZ(${windTransfrom}deg)` }} />
                    )}
                </>
            )}
        </>
    )
}

export default function Location({ location }) {

    const [weatherData, setWeatherData] = useState({});
    const [apiError, setApiError] = useState("");
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        const loadingIndicatorTimeout = setTimeout(() => setisLoading(true), 500);
        const getWeather = async () => {
            const result = await getLocationWeather(location);
            clearTimeout(loadingIndicatorTimeout)
            setisLoading(false);
            setWeatherData(result.success ? result.data : {})
            setApiError(result.success ? "" : result.error)
        }
        getWeather()
        return () => clearTimeout(loadingIndicatorTimeout)
    }, [location])

    const { flagIcon, countryCode } = useMemo(() => {
        return {
            flagIcon: weatherData.sys ? `https://www.countryflags.io/${weatherData.sys.country}/shiny/32.png` : "",
            countryCode: weatherData.sys ? weatherData.sys.country : "",
        }

    }, [weatherData])

    return (
        <>
            <div>
                <Typography variant="h5">
                    {location}
                </Typography>
                {flagIcon && <img alt={countryCode} src={flagIcon} />}
            </div>
            <div>
                <LoadingIndicator isLoading={isLoading} />
                <ErrorMessage apiError={apiError} />
                <WeatherDisplay weatherData={weatherData} />
            </div>
        </>
    )
}

Location.propTypes = {
    location: PropTypes.string.isRequired,
}
