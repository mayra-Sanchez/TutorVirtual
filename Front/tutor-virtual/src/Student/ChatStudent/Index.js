import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import Dice from "../../Resources/dice.png";
import Arrow from "../../Resources/arrow.png"
import "./ChatStudent.css";

function ChatStudent() {
  return (
    <>
      <Navbar href={"/Student/Tutor"} image={Image} role={"users"} />
      <br />
      <div className="container_chat_student">
        <div className="left-column">
          <div className="course-container">
            <div className="card_course">
              <div className="info_course">
                <h1>Curso</h1>
                <p>Conceptos básicos de python</p>
                <br />
                <h1>Raul Quintero</h1>
              </div>
            </div>
            <div className="imageDice-container">
              <img src={Dice} alt="Logo" className="imageDice" />
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="chat-containerStudent">
            <div className="answers"></div>
            <div className="questions">
                <div className="input-container">
                    <input className="input-questions"/>
                    <button className="imageButton"><img src={Arrow} alt="Logo" className="imageArrow"/></button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatStudent;
