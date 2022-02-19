import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import UserService from "../services/user.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart,faHourglassHalf,faHourglassEnd } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';
import  Alert  from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import jam_loader from "../assets/jam_loader.gif"

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() =>{
    UserService.getUserBoard().then((response) => {
      setLoader(false)
        setContent(response.data)
          });
  },[])

  const [checkedButton, setCheckedButton] = useState(currentUser.isNewsletter);
  const [successAlert, setShowSuccessAlert] = useState(false);
  const [deleteAlert, setShowDeleteAlert] = useState(false);


function checkClick(e){
  try{
  UserService.postUserNewsletterStatusChange(e);
  currentUser.isNewsletter = e;
  localStorage.setItem("user", JSON.stringify(currentUser));
  if(e == true){
    setShowSuccessAlert(true);
    setCheckedButton(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000);
  }else{
    setShowDeleteAlert(true);
    setCheckedButton(false);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 2000);
  }}catch(err){
    console.log(err);
  }

}

function getGameStatus(gameStart){
  let gameDateStart = Date.parse(gameStart[1] + " " + gameStart[2] + " " + gameStart[0] + " " + gameStart[3] + ":" + gameStart[4]);
  let gameDateEnd =gameDateStart + 2*60*60*1000;
  if(gameDateStart > Date.now()){
    return <FontAwesomeIcon icon={faHourglassStart} />
  }else if(gameDateEnd > Date.now() && gameDateStart < Date.now() ){
    return <FontAwesomeIcon icon={faHourglassHalf} />
  }else{
    return <FontAwesomeIcon icon={faHourglassEnd} />
  }
  
}

  
  return (
    <div className="container">
        <h1 className="upcoming-matches">Upcoming Matches</h1>
        {loader &&
              <div> <img className="loader" src={jam_loader}  alt="loading..." /></div>
              }

{!loader &&( <table className="styled-table">  
        <thead>
            <tr>  
                <th>#</th>  
                <th>Status</th>  
                <th>Game</th>  
                <th>Gametime</th>  
            </tr>  
        </thead>
            <tbody>
            {content.map((game, index) => (  
               <tr key={index}>  
                 <td>{index +1}</td>  
                 <td> {getGameStatus(game.start)} </td>  
                 <td>{game.title}</td>  
                 <td>{game.start[2]+ "/" +game.start[1] + "/" + game.start[0] +"\n at " + game.start[3]+ ":"}{+game.start[4]=='0'?"00":game.start[4]} </td>  
               </tr>  
             )) }
          </tbody>
        </table>)}   


        <div className="add-to-newsletter">
          <div className="toggle-newsletter"><BootstrapSwitchButton checked={checkedButton} width="120" onstyle="success"  onChange={e=>checkClick(e)} onlabel='מצורף' offlabel='לא מצורף' offstyle='info'/>  להצטרף לרשימת הפצה</div>
        </div>

        


{/* Sucess Alert */}
    <Alert show={successAlert} variant="success">
    <Alert.Heading>!תודה שהצטרפתם</Alert.Heading>
    <p>
. בקרוב תקבלו מייל עם כל מועדי המשחקים הקרובים
    </p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button onClick={() => setShowSuccessAlert(false)} variant="outline-success">
        סגור
      </Button>
    </div>
  </Alert>
{/* Delete Alert */}
    <Alert show={deleteAlert} variant="danger">
    <Alert.Heading>עד הפעם הבאה</Alert.Heading>
    <p>
    :( אוקיי.. לא מציקים יותר 
    </p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button onClick={() => setShowDeleteAlert(false)} variant="outline-danger">
      סגור
      </Button>
    </div>
  </Alert>


    </div>

  );
};

export default Profile;
