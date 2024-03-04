import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";
import "./Student.css";
import CourseCard from "../Components/courseCard.js";

function Student() {
  const courses = [
    {
      id: 1,
      name: "Curso de Matemáticas",
      teacher: "Profesor Matemático",
      creationDate: "01/01/2023",
      description: "Aprende matemáticas básicas y avanzadas.",
    },
    {
      id: 2,
      name: "Curso de Historia",
      teacher: "Profesora Historiadora",
      creationDate: "01/01/2023",
      description: "Conoce la historia de la humanidad.",
    },
    {
      id: 3,
      name: "Curso de Ciencias",
      teacher: "Profesora Científica",
      creationDate: "01/01/2023",
      description: "Descubre el mundo de las ciencias naturales.",
    },
    {
      id: 1,
      name: "Curso de Programación en JavaScript",
      teacher: "Profesor JavaScript",
      creationDate: "02/05/2023",
      description: "Aprende a programar en JavaScript desde cero.",
    },
    {
      id: 2,
      name: "Curso de Diseño Gráfico",
      teacher: "Profesora Diseñadora",
      creationDate: "10/10/2023",
      description: "Domina las herramientas de diseño gráfico más utilizadas.",
    },
    {
      id: 3,
      name: "Curso de Marketing Digital",
      teacher: "Profesor Marketero",
      creationDate: "15/03/2023",
      description:
        "Descubre las estrategias más efectivas de marketing en línea.",
    },
    {
      id: 4,
      name: "Curso de Fotografía",
      teacher: "Profesor Fotógrafo",
      creationDate: "22/07/2023",
      description:
        "Aprende los principios básicos y avanzados de la fotografía.",
    },
    {
      id: 5,
      name: "Curso de Cocina Gourmet",
      teacher: "Chef Gourmet",
      creationDate: "05/12/2023",
      description:
        "Descubre los secretos de la cocina gourmet y sorprende a tus amigos y familiares.",
    },
  ];

  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="titleStudent">
        <h1>Cursos</h1>
      </div>
      <div className="course-container-scroll">
        <div className="course-container">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <CourseCard
                name={course.name}
                teacher={course.teacher}
                creationDate={course.creationDate}
                description={course.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Student;
