import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import Dice from "../../Resources/dice.png";
import Arrow from "../../Resources/arrow.png";
import { listCourses } from "../../Services/Course";
import React, { useState, useEffect } from "react";
import { chatTutor } from "../../Services/Tutor";
import { useParams } from "react-router-dom";
import Microfono from "../../Resources/microphone.png";
import { useSpeechApi } from "../../Components/Hooks/SpeechApi.js";
import "./ChatStudent.css";

function ChatStudent() {
  const { selectedCourseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { transcript, isListening, startListening, stopListening } =
    useSpeechApi();

  const [chat, setChat] = useState({
    content: "",
  });

  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await listCourses();
        const selectedCourse = courses.find(
          (course) => course.id === parseInt(selectedCourseId)
        );
        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error fetching course info:", error);
      }
    };
    fetchData();
  }, [selectedCourseId]);

  const chatChange = (e) => {
    setChat({ ...chat, [e.target.name]: e.target.value });
  };

  //For the speaker
  const speakTutorResponse = (text) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      synth.speak(utterance);
    }
  };

  useEffect(() => {
    if (response && response.answer) {
      speakTutorResponse(response.answer);
    }
  }, [response]);

  //For the listening
  useEffect(() => {
    if (!isListening) {
      setChat((prevData) => ({
        ...prevData,
        content: prevData.content + transcript,
      }));
    }
  }, [transcript, isListening]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // const startRecording = () => {
  //   if ("webkitSpeechRecognition" in window) {
  //     const recognition = new window.webkitSpeechRecognition();
  //     recognition.continuous = false;
  //     recognition.interimResults = false;
  //     recognition.lang = "es-ES";

  //     recognition.onstart = () => {
  //       console.log("Recording started");
  //     };

  //     recognition.onresult = (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       setChat({ ...chat, content: transcript });
  //       recognition.stop();
  //     };

  //     recognition.onerror = (event) => {
  //       console.error("Error during recording:", event.error);
  //       recognition.stop();
  //     };

  //     recognition.onend = () => {
  //       console.log("Recording ended");
  //     };

  //     recognition.start();
  //   } else {
  //     console.error("Speech recognition not supported by this browser");
  //   }
  // };

  // const clearInput = () => {
  //   setChat({ ...chat, content: "" });
  // };

  const sendChat = async () => {
    setLoading(true);
    var word = chat.content.trim().split(/\s+/);
    if (word.length < 40) {
      setError(false);
      try {
        const response = await chatTutor(selectedCourseId, chat);
        setResponse(response);
        setLoading(false);
      } catch (error) {
        console.error("Ocurrio un error", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Navbar
        href={`/Student/${selectedCourseId}/Tutor`}
        image={Image}
        role={"users"}
      />
      <br />
      <div className="container_chat_student">
        <div className="left-column">
          <div className="course-container2">
            <div className="card_course">
              <div className="info_course">
                <h1>Curso</h1>
                <br />
                {course && <p className="ptext">{course.name}</p>}
                <br />
                <h1>Instructor</h1>
                <br />
                {course && <p className="ptext">{course.instructor_name}</p>}
                <br />
                <h1>Descripción del curso</h1>
                <br />
                {course && <p className="ptext">{course.description}</p>}
              </div>
            </div>
            <div className="imageDice-container">
              <img src={Dice} alt="Logo" className="imageDice" />
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="chat-containerStudent">
            <div className="answers">
              <div className="inner-content">
                {loading ? (
                  <div className="progress-loader">
                    <div className="progress"></div>
                  </div>
                ) : response && response.answer ? (
                  <p>{response.answer}</p>
                ) : null}
              </div>
            </div>
            <div className="questions">
              {error ? (
                <span className="error">
                  No puedes realizar preguntas con más de 40 palabras
                </span>
              ) : (
                <div className="input-container">
                  <input
                    name="content"
                    onChange={chatChange}
                    className="input-questions"
                    value={chat.content}
                    disabled={isListening}
                  />
                  {isListening ? (
                    <div className="ContainerVoiceChat">
                      <div className="visualizador-audio">
                        <div className="linea"></div>
                        <div className="linea"></div>
                        <div className="linea"></div>
                        <div className="linea"></div>
                        <div className="linea"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={toggleListening}
                        className="imageButton2"
                      >
                        <img
                          src={Microfono}
                          alt="Micrófono"
                          className="record-button"
                        />
                      </button>
                      <button onClick={sendChat} className="imageButton">
                        <img src={Arrow} alt="Enviar" className="imageArrow" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatStudent;
