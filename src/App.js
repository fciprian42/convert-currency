import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Box,
    Typography,
    FormControl,
    MenuItem,
    Input,
    InputAdornment,
    TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Loading from './components/Loading';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './App.scss';

const Currencies = ({ rates, currency, handleConvert }) => {
    return (
        <TextField
            style={{ width: '75%' }}
            className={currency ? styles.selectSVG : styles.input}
            select
            variant="filled"
            label="Devise"
            value={currency}
            onChange={(e) => handleConvert(e)}
        >
            {rates && rates.length > 0 && rates.map((rate, key) => {
                return (
                    <MenuItem key={key} value={rate.value}>
                        {rate.currency}
                        <span className={styles.subtitle}>
                            {rate.value}
                        </span>
                    </MenuItem>
                )
            })}
        </TextField>
    )
};

Currencies.propType = {
    rates: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    handleConvert: PropTypes.func.isRequired
};

const App = () => {
    const [currency, setCurrency] = useState('');
    const [value, setValue] = useState('');
    const [convert, setConvert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rates, setRates] = useState(null);

    useEffect(() => {
        let source = axios.CancelToken.source();

        const getRates = async () => {
            const results = await axios.get('http://data.fixer.io/api/latest', {
                params: {
                    access_key: '111bff0fa97a1ec2f2d25598bda5dc36'
                },
                cancelToken: source.token
            });

            if (results.status === 200) {
                let currencies = [];
                for (let [key, value] of Object.entries(results.data.rates)) {
                    currencies.push({ currency: key, value })
                }
                setRates(currencies);
            }
        };

        getRates();

        return () => {
            source.cancel();
        }
    }, ['http://data.fixer.io/api/latest']);

    const handleChange = (e) => {
        const value = e.target.value;

        if (!(/[0-9]/.test(value))) {
            e.preventDefault();
            return;
        }

        if (currency !== '') {
            setLoading(true);

            setTimeout(() => {
                setLoading(false)
            }, 1000);

            setConvert(Math.round(((value * currency) + Number.EPSILON) * 100) / 100);
        }

        setValue(value);
    };

    const handleConvert = async (e) => {
        const currency = e.target.value;

        setCurrency(currency);

        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 1000);

        setConvert(Math.round(((value * currency) + Number.EPSILON) * 100) / 100);
    };

    return (
        <>
            <Grid item xs={false} sm={4} md={7} className={styles.devise}>
                <Box className={styles.result}>
                    {loading && <Loading/>}
                    {!loading && convert >= 0 && <Typography variant='h2'>
                        {convert}
                    </Typography>}
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box className={styles.convert}>
                    <div>
                        <Typography variant='h4' align='center'>
                            iFeelSmart
                        </Typography>
                        <Typography variant='subtitle1' align='center'>
                            Un moyen ultra rapide de convertir une monnaie en temps réel.
                        </Typography>
                    </div>
                    <div className={styles.form}>
                        <FormControl fullWidth>
                            <Input
                                value={value}
                                onChange={(e) => handleChange(e)}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                        <FontAwesomeIcon icon={['fal', 'long-arrow-down']} className={styles.svg} />
                        <Currencies rates={rates} currency={currency} handleConvert={handleConvert} />
                    </div>
                    <div></div>
                </Box>
            </Grid>
        </>
    )
};

export default App