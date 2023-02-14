import React, { Component } from "react";
import question from "./Question.module.css"
class Question extends Component {
    render() {
        return (
            <>
                <div className="bg_about"></div>
                <div className={question["faq"] + " " + question["p-4"] + " " + question["mb-3"]}>
                    <h2 className={question["mb-4"]}>Frequently Asked Questions</h2>
                    <small className={question["mb-2"]}>CONTENT</small>
                    <div className={question.row}>
                        <div className={`col-lg-3 ${question["col-md-4"]}`}>
                            <div className={question.faqlinks} >General</div>
                        </div>
                        <div className={`col-lg-3 ${question["col-md-4"]}`}>
                            <div className={question.faqlinks}>Payment</div>
                        </div>
                        <div className={`col-lg-3 ${question["col-md-4"]}`}>
                            <div className={question.faqlinks}>Cancellation</div>
                        </div>
                        <div className={`col-lg-3 ${question["col-md-4"]}`}>
                            <div className={question.faqlinks}>Other Problem?</div>
                        </div>
                    </div>

                    <div id="accordion">
                        <h3 className={question["pt-5"] + " " + question["mb-2"]}>General</h3>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0 mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id="heading0Gen">
                                <h5 className={question["mb-0"]}>
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse0Gen" aria-expanded="false" aria-controls="collapse0Gen">
                                        How to book an online session?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapse0Gen" className={question.collapse} aria-labelledby="heading0Gen" data-parent="#accordion">
                                <div className={`${question["card-body"]}px-0 py-3`}>
                                    <ul>
                                        <li>Click on (Online Consulting) and choose the desired field from the list.
                                        </li>
                                        <li>Click on the nearest available appointment or choose another appointment that suits you.
                                        </li>
                                        <li>After choosing a date suitable for you, please click on (book session).
                                        </li>
                                        <li>You will then be directed to the sign-up page. Enter your email & phone number, then you will be directed to the payment page to choose the suitable payment method for you (Fawry / Vodafone Cash / Credit Card).
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0"] + " " + question["mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id="heading1Gen">
                                <h5 className="mb-0">
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse1Gen" aria-expanded="false" aria-controls="collapse1Gen">
                                        How to choose the right expert?
                                    </button>
                                </h5>
                            </div>

                            <div id={question.collapse1Gen} className={question.collapse} aria-labelledby="heading1Gen" data-parent="#accordion">
                                <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]}>
                                    <p>The selection of the appropriate expert varies for each case.</p>
                                </div>
                            </div>
                        </div>
                        <h3 className={question["pt-5"] + " " + question["mb-2"]}>Payment</h3>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0"] + " " + question["mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id={question.heading0Pay}>
                                <h5 className={question["mb-0"]}>
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse0Pay" aria-expanded="false" aria-controls="collapse0Pay">
                                        How to pay for the session?
                                    </button>
                                </h5>
                            </div>

                            <div id={question.collapse0Pay} className={question.collapse} aria-labelledby="heading0Pay" data-parent="#accordion">
                                <div className={`${question["card-body"]} px-0 py-3`}>
                                    <span>payment methods include:(Fawry / Vodafone Cash / Credit Card). </span>
                                    <br />
                                    <br />
                                    <h2>Payment via Fawry</h2>

                                    <span>After choosing the appropriate expert and logging in, you will be automatically directed to the payment page.
                                        Click on Fawry to register your email and phone number. Following this you will receive a message on the phone number
                                        that you registered including a fawry code and service number for Esaal. You will need to go to the nearest place where
                                        Fawry payments are available to pay the amount. You will need to pay the amount before the expiration date/time for your
                                        fawry code.</span>
                                    <br />
                                    <br />
                                    <h2>Payment via credit card</h2>

                                    <span> order to pay using your credit card, make sure that the card isn't expired, and that the appropriate amount for the
                                        session is available. After choosing the appropriate session and logging in, you will be automatically directed to the
                                        payment page. Click on (credit card) and enter the credit card details then a message will be sent to your phone number
                                        with an OTP number, enter it then you will receive a message and an email confirming that the payment process has been
                                        successful and the details of the session.</span>

                                </div>
                            </div>
                        </div>
                        <h3 className={question["pt-5"] + " " + question["mb-2"]}>Cancellation</h3>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0"] + " " + question["mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id={question.heading0Can}>
                                <h5 className={question["mb-4"]}>
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse0Can" aria-expanded="false" aria-controls="collapse0Can">
                                        How to cancel a session
                                    </button>
                                </h5>
                            </div>

                            <div id={question.collapse0Can} className={question.collapse} aria-labelledby="heading0Can" data-parent="#accordion">
                                <div className={`${question["card-body"]} px-0 py-3`}>
                                    <span>If you need to cancel a reservation, please do so 24 hours before the session to avoid any deduction
                                        from the amount paid. If you cancel less than 24 hours before the session time, 50% of the amount paid will be
                                        deducted. If you cancel 3 hours before the session or in case of a no-show, you will be charged the full amount
                                        of the session.</span>
                                </div>
                            </div>
                        </div>
                        <h3 className={question["pt-5"] + " " + question["mb-2"]}>Other Problem?</h3>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0"] + " " + question["mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id={question.heading0Oth}>
                                <h5 className={question["mb-4"]}>
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse0Oth" aria-expanded="false" aria-controls="collapse0Oth">
                                        What shall I do if I face any problems before, during, or after the session?
                                    </button>
                                </h5>
                            </div>

                            <div id={question.collapse0Oth} className={question.collapse} aria-labelledby="heading0Oth" data-parent="#accordion">
                                <div className={`${question["card-body"]} px-0 py-3`}>

                                    <span>Please contact our our technical support team on the website. The team is available 24/7
                                        and can help you enter the session, offering technical support during the session, or with
                                        any help once the session has ended.</span>
                                </div>
                            </div>
                        </div>
                        <div className={question["card"] + " " + question["border-0"] + " " + question["p-0"] + " " + question["mb-4"]}>
                            <div className={question["card-header"] + " " + question["p-0"] + " " + question["border-0"]} id={question.heading1Oth}>
                                <h5 className={question["mb-4"]}>
                                    <button className={`btn btn-link ${question["p-0"]} collapsed`} data-toggle="collapse" data-target="#collapse1Oth" aria-expanded="false" aria-controls="collapse1Oth">
                                        How many sessions are reserved with the doctor or therapist?
                                    </button>
                                </h5>
                            </div>

                            <div id={question.collapse1Oth} className={question.collapse} aria-labelledby="heading1Oth" data-parent="#accordion">
                                <div className={`${question["card-body"]} px-0 py-3`}>
                                    <span> The number of sessions varies based on the patient needs; however the maximum number is 6 sessions.
                                        This is determined by the therapist in charge of your case.</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Question;