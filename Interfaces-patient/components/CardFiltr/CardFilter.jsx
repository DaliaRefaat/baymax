import React, { Component } from "react";
import styles from "./CardFilter.module.css";

class CardFilter extends Component {
    render() {
        return (
            <table className={styles.col}>
                <tr>
                    <td className={styles.one}>
                        <h2 className={styles.h2}>session data</h2>
                        <button className={styles.two + " " + styles.button}>today</button>
                        <button className={styles.two + " " + styles.button}>tomorrow</button>
                        <button  >Anytime</button>
                    </td>
                </tr>
                <tr>
                    <td className={styles.one}>
                        <h2 className={styles.h2}>session duration</h2>
                        <button className={styles.two + " " + styles.button}>30 mins</button>
                        <button className={styles.two + " " + styles.button}>60 mins</button>
                        <button >All</button>
                    </td>
                </tr>
                <tr>
                    <td className={styles.one}>
                        <h2 className={styles.h2}>Gender</h2>
                        <button className={styles.two + " " + styles.button}>famale</button>
                        <button className={styles.two + " " + styles.button}>male</button>
                        <button >All</button>
                    </td>
                </tr>
                <tr>
                    <td className={styles.one}>
                        <h2 className={styles.h2}>state</h2>
                        <button className={styles.two + " " + styles.button}>online</button>
                        <button className={styles.two + " " + styles.button}>offline</button>
                        <button >All</button>
                    </td>
                </tr>
            </table>

        );
    }
}

export default CardFilter;