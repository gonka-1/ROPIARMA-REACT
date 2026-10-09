import  Alert  from 'react-bootstrap/Alert';
import styles from './alert.module.css'

function App_alert({ mostrarAlert, cerrarAlert, variant = "primary", msgAlert }) {
    return(
        <Alert
        className={styles.alerta}
        dismissible
        variant = {variant}
        show = {mostrarAlert}
        onClose={cerrarAlert}
        >
            {msgAlert}
        </Alert>
    );
}

export default App_alert;
