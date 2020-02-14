import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowDown, faCalculator } from '@fortawesome/pro-light-svg-icons';
import App from './App';
import styles from './App.scss';

library.add(faLongArrowDown, faCalculator);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4b7bec'
        },
        secondary: {
            main: '#3867d6'
        }
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container style={{ height: '100vh' }} className={styles.container}>
            <App  />
        </Grid>
    </ThemeProvider>,
    document.getElementById('app')
);