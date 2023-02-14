import  React,{ Component } from "react";
import styles from"./CardZoomSettings.module.css";
class CardZoomSettings extends Component {
    render() {
        return (
            <>
            <div className={styles.div}>zoom</div>
            <p className={styles.p}>Apl key</p>
        <input className={styles.input} type="text" />
        <p className={styles.p}>Apl secret</p>
        <input className={styles.input} type="text" />
        <p className={styles.p}>video consultation fees</p>
        <input className={styles.input} type="text" />
        <h3 className={styles.h3}>zoom configuration guide</h3>
<div className={styles.one}> step 1:sign up or sign in here: <a href="#">zoom market place portal</a></div>
    <div className={styles.two}> step 2:click/hover on develop button at the right in navigation bar and click on build app<a href="#">creat app</a></div>
    <div className={styles.three}> step 3:select jwt and click create</div>
    <div className={styles.four}> step 4:fill the mandatory information and in the app credentials tag you can see apl key and apl secret</div>
<div className={styles.five}> step 5:copy and paste apl key and apl secret here and click on save button and you are ready to go</div>
<button className={styles.button}>save configuration</button>

            </>
        );
    }
}

export default CardZoomSettings;
