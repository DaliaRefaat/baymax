import  React,{ Component } from "react";
import "./MyHealthRecourd.css";

class MyHealthRecourd extends Component {
    render() {
        return (
<>
  <div className="container">
    <h1><strong>General Information :</strong></h1> <br/>
    <div className="btn btn-dark">Your Age</div>
    <br/>


      <input type="number" id="quantity" style= {{width: 300+'px', height: 50+'px'}} name="quantity"
        placeholder="enter your Age" min="10" max="90"/>


    <br/>
    <div className="btn btn-dark " style={{width: 100+'px'}}>Gender </div>
    male <input type="radio" name="male"/>
    female <input type="radio" name="male"/>
    <br/> <br/>
    <button type="button" className="btn btn-dark"  >Blood Type</button>
    <div className="dropdown-menu">
    </div> <br/>


                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{width: 300+'px', height: 40+'px' }}> select your Blood Type
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <a href="#">A+</a>
                    <li><a href="#">A-</a></li>
                    <li><a href="#">B+</a></li>
                    <li><a href="#">O+</a></li>
                    <li><a href="#">O-</a></li>
                    <li><a href="#">AB+</a></li>
                    <li><a href="#">AB-</a></li>

                  </ul>
                </div>


    <br/>
    <div className="btn btn-dark" style={{width: 90+'px'}}> smoker </div> <br/>
    <div className="dropdown">
      <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{width: 300+'px', height: 40+'px'}}  placeholder="select yes or no "> select yes or no
      <span className="caret"></span></button>
      <ul className="dropdown-menu">
        <li><a href="#">yes</a></li>
                    <li><a href="#">No</a></li>


      </ul>
    </div> <br/>
    <button type="button" className="btn btn-dark">Weight kg</button> <br/>

      <input type="number" id="quantity" style={{width: 300+'px', height: 50+'px'}} name="quantity"
        placeholder="enter Weight in kg" min="1" max="1000" />
      <br/><br/>
      <button type="button" className="btn btn-dark">Height cm</button> <br/>

        <input type="number" id="quantity" style={{width: 300+'px', height: 50+'px'}} name="quantity"
          placeholder="enter height in cm" min="1" max="1000"/>
        <br/> <br/>
        <input type="button" value="calculate" style={{width: 350+'px'}} className="btn btn-dark"/>
        <br/><br/>

        <div className="row bg-dark" style={{height: 60+'px'}}>
          <h2 style={{color:'white'}}><strong>Your BMI :</strong></h2>
          <div className="col text-center">
            <div className="btn " style={{color:'silver'}}>underweight <br/> below 18.5 </div>

            <div className="btn " style={{color:'silver'}}>normal <br/> 18.5-24.9</div>
            <div className="btn " style={{color:'silver'}}>overweight <br/> 25.0-29.9</div>
            <div className="btn " style={{color:'silver'}}>obese <br/> 30.0 and above</div>

          </div>
        </div>
  </div>
  <hr style={{width:100+'%'}} color="black" heigth="100px"/>
  <form>
  <div className="container mt-3">
    <h3><strong> Medical History:</strong></h3>
    <div className="card" style={{height: 8+'rem', width: 36+'rem'}} >
      <div className="card-body">
        <div className="btn btn-dark">
          Do you suffer from chronic diseases?</div>



          <div className="input-group mt-3 mb-3">
            <div className="input-group-prepend">
              <button type="button" className="btn btn-outline dropdown-toggle" data-toggle="dropdown"
                style=
                {{width: 500+'px', height: 40+'px'}}>
                select your diseases
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">select your diseases</a>
                <a className="dropdown-item" href="#">asthma</a>
                <a className="dropdown-item" href="#">bipolar mood</a>
                <a className="dropdown-item" href="#">Brochiectasis</a>
                <a className="dropdown-item" href="#">Cardiac failure</a>
                <a className="dropdown-item" href="#">Cardiomyopathy</a>
                <a className="dropdown-item" href="#">Chronic obstructive pulmonary</a>
                <a className="dropdown-item" href="#">Chronic kidney</a>
                <a className="dropdown-item" href="#">Coronary artery</a>
                <a className="dropdown-item" href="#">Crohns</a>
                <a className="dropdown-item" href="#">Diabetes insipidus</a>
                <a className="dropdown-item" href="#">Diabetes mellitus</a>
                <a className="dropdown-item" href="#">Dysrhythmia</a>
                <a className="dropdown-item" href="#">Epilepsy</a>
                <a className="dropdown-item" href="#">Glaucoma</a>
                <a className="dropdown-item" href="#">Haemophilia</a>
                <a className="dropdown-item" href="#">HIV</a>
                <a className="dropdown-item" href="#">Hyperlipidaemia</a>
                <a className="dropdown-item" href="#">Hypertension</a>
                <a className="dropdown-item" href="#">Hypothyroidism</a>
                <a className="dropdown-item" href="#">Multiple sclerosis</a>
                <a className="dropdown-item" href="#">Parkinsons</a>
                <a className="dropdown-item" href="#">Rheumatoid arthritis</a>
                <a className="dropdown-item" href="#">Schizophrenia</a>
                <a className="dropdown-item" href="#"> Systemic lupus erythematosis</a>
                <a className="dropdown-item" href="#"> Ulcerative colitis </a>
              </div>
            </div>

          </div>

      </div>
    </div>
  </div>
  <div className="container mt-3">

    <div className="card" style={{height: 10+'rem', width: 36+'rem' }}>
      <div className="card-body">
        <div className="btn btn-dark">
          Your Current Medications</div>
          <div className="input-group mt-3 mb-3">
            <div className="input-group-prepend">
              <input type="text" style={{width: 500+'px', height: 30+'px'}}/>
            </div>
            <br/>
            <strong>  Upload your prescription :</strong>
            <br/><br/>
            <input type="file" value="Browse..."/>
          </div>
      </div>
    </div>
  </div>
  <div className="container mt-3">

    <div className="card" style={{height: 10+'rem', width: 36+'rem' }}>
      <div className="card-body">
        <div className="btn btn-dark">
          Latest Lab test</div>
          <div className="input-group mt-3 mb-3">
            <div className="input-group-prepend">
              <input type="text" style={{width: 500+'px', height: 30+'px'}}/>
            </div>
            <br/>
            <strong> Upload your lab test :</strong><br/>
            <br/><br/>
            <input type="file" value="Browse..." />
          </div>
      </div>
    </div>
    <hr style={{width: 60+'%' }}/>
    <p>Your health record will be shared with your treating doctor</p>
    <input type="submit" value="SAVE" className="btn btn-dark"/>
  </div>
</form>
</>
        );
    }
}

export default MyHealthRecourd;
