import React, { Component } from "react";
import home from './Home.module.css';

class Home extends Component {
    render() {
        return (
            <>

                <div className={home.body}>
                    <div className={home.first}>
                        <p className={home.p1}>Access <span className={home.number}>583</span> experts <br />with one click</p>
                        <br /><br />
                        <p className={home.contact}>Contact our experts through the hotline
                            <i className="fa-solid fa-phone"></i><span className="tel">5555</span>
                        </p>
                    <br /><br />
                    <center>
                        <div className={home.div1}>
                            <div className={home.div2}>
                                <a href="/"><h2 className={home.h2}><i className="fa-regular fa-clipboard"></i> Book a session</h2></a>
                                <a href="/"><h2 className={home.h2}><i className="fa-sharp fa-solid fa-comment-dots"></i> Ask a Question</h2></a>
                                <a href="/"><h2 className={home.h2}><i className="fa-sharp fa-solid fa-phone" id={home.ph}></i> Call Expert</h2></a>
                            </div>
                        </div>
                    </center>
                    <br /><br /><br />
                    </div>
                    <center>
                        <div className={home["card-first"]} >
                            <img src={require('../../../../../img/rr2.png')} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className={home["card-title"]}>Home services</h5>
                                <p className="card-text">Baymax home services will make it easy for you.</p>
                                <a href="./" className="btn btn-primary">Book Services now</a>
                            </div>
                        </div>
                    </center><br /><br /><br />
                    <p className="why">Why Baymax</p><br /><br />
                    <center>
                        <div className="divAll4">
                            <div className={home.div4}>
                                <div className={home.Features}><img src={require('../../../../../img/Bilingual.png')} alt="" className={home.vg} /><br />Bilingual experience</div>
                                <div className={home.Features}><img src={require('../../../../../img/confidentiality.png')} alt="" className={home.vg} /><br />Full confidentiality</div>
                                <div className={home.Features}><img src={require('../../../../../img/personalized.png')} alt="" className={home.vg} /><br />Personalized answers</div>
                            </div>
                            <div className={home.div4}>
                                <div className={home.Features}><img src={require('../../../../../img/multiple.png')} alt="" className={home.vg} /><br />Multiple payment options</div>
                                <div className={home.Features}><img src={require('../../../../../img/support.png')} alt="" className={home.vg} /><br />24/7 Support</div>
                                <div className={home.Features}><img src={require('../../../../../img/Follow.png')} alt="" className={home.vg} /><br />Follow-ups</div>
                            </div>
                        </div>
                    </center><br /><br /><br /><br />
                    <h5 className={home["card-title"]}>Your confidentiality and anonymity are fully guaranteed</h5>
                    <div className={"cards " + home["text-bg-dark"]}>

                        <img src={require('../../../../../img/img-24-removebg-preview (1).png')} className={home["card-img"]} alt="..." />


                    </div><br /><br /><br /><br />
                    <p className={home.why}>How Baymax works</p><br /><br />
                    <div className="container px-4 text-center">
                        <div className="row gx-5">
                            <div className="col">
                                <div className="p-3 border bg-light"><span className={home.nu}>01</span><br />Chooose Field<br /><img src={require('../../../../../img/select-services.png')} alt="" className={home.sg} /></div>
                            </div>
                            <div className="col">
                                <div className="p-3 border bg-light"><span className={home.nu}>02</span><br />Choose expert<br /><img src={require('../../.././../../img/choose-field.png')} alt="" className={home.sg} /></div>
                            </div>
                            <div className="col">
                                <div className="p-3 border bg-light"><span className={home.nu}>03</span><br />Select preferred <br />method of <br />communication <br />(Video/chatting)<br /><img src={require('../../../../../img/choose-expert.png')} alt="" className={home.sgs} /></div>
                            </div>
                            <div className="col">
                                <div className="p-3 border bg-light"><span className={home.nu}>04</span><br />Payment options<br /><img src={require('../../.././../../img/payment-options.png')} alt="" className={home.sg} /></div>
                            </div>
                            <div className="col">
                                <div className="p-3 border bg-light"><span className={home.nu}>05</span><br />Start session<br /><img src={require('../../../../../img/start-session.png')} alt="" className={home.sg} /></div>
                            </div>
                        </div>
                    </div>
                </div><br /><br /><br /><br />
                <p className={home.why}>Our fields</p><br /><br />
                <div className="container text-center">
                    <div className="row">
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/1.png')} alt="" className={home.im} /><br />Marriage & Relationships</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/2.png')} alt="" className={home.im} /><br />Parenting</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/3.png')} alt="" className={home.im} /><br />Nutrition & Fitness</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/4.png')} alt="" className={home.im} /><br />Mental Health and Relationships</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/5.png')} alt="" className={home.im} /><br />Career Coach & Self-Development</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/6.png')} alt="" className={home.im} /><br />Pediatrics and New Born</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/7.png')} alt="" className={home.im} /><br />Medical Consultations</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/8.png')} alt="" className={home.im} /><br />Adolescence disorders</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/9.png')} alt="" className={home.im} /><br />Addiction</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/10.png')} alt="" className={home.im} /><br />Sexual disorders</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/11.png')} alt="" className={home.im} /><br />Anxiety & Depression disorders</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/12.png')} alt="" className={home.im} /><br />Aging Issues</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/13.png')} alt="" className={home.im} /><br />Child disorders</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/14.png')} alt="" className={home.im} /><br />Ear, Nose and Throat</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/15.png')} alt="" className={home.im} /><br />Internal Medicine</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/16.png')} alt="" className={home.im} /><br />Dermatology & Genital</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/17.png')} alt="" className={home.im} /><br />Gynecology and Infertility</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/18.png')} alt="" className={home.im} /><br />General Surgery</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/20.png')} alt="" className={home.im} /><br />Orthopedics</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/21.png')} alt="" className={home.im} /><br />Diabetes and Endocrinology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/22.png')} alt="" className={home.im} /><br />General Practice</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/23.png')} alt="" className={home.im} /><br />Family Medicine</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/24.png')} alt="" className={home.im} /><br />Geriatrics (Old People Health)</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/25.png')} alt="" className={home.im} /><br />Urology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/26.png')} alt="" className={home.im} /><br />Cardiac</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/27.png')} alt="" className={home.im} /><br />Ophthalmology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/28.png')} alt="" className={home.im} /><br />Dentistry</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/29.png')} alt="" className={home.im} /><br />Hepatology & Gastroenterology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/30.png')} alt="" className={home.im} /><br />Neurology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/31.png')} alt="" className={home.im} /><br />Nephrology</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/32.png')} alt="" className={home.im} /><br />Oncology (Tumor)</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/33.png')} alt="" className={home.im} /><br />Plastic Surgery</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/35.png')} alt="" className={home.im} /><br />Obesity and Laparoscopic Surgery</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/36.png')} alt="" className={home.im} /><br />Chest and Respiratory</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/37.png')} alt="" className={home.im} /><br />Borderline personality disorder</div>
                        <div className={home["Feature"] + " col-6 col-md-4"}><img src={require('../../../../../img/38.png')} alt="" className={home.im} /><br />Obsessive-compulsive disorder</div>
                    </div>
                </div>

                <br /><br /><br /><br />
                <center> <img src={require('../../../../../img/wallpaperflare.com_wallpaper (2) (1).png')} alt="" className={home.final} /></center>

            </>

        );
    }
}

export default Home;
