import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";
import "./Student.css";
import CourseCard from "../Components/CourseCard.js";
import { listCourses } from "../Services/Course.js";
import { useTranslation } from "react-i18next";

function Student() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await listCourses();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const getImageForRoleAndLanguage = () => {
    const language = i18n.language;
    const roleImages = {
      student: {
        en: require("../Resources/student/ingles.png"),
        fr: require("../Resources/student/frances.png"),
        es: require("../Resources/student/español.png"),
        de: require("../Resources/student/aleman.png"),
        md: require("../Resources/student/mandarin.png"),
        hd: require("../Resources/student/hindi.png"),
        pt: require("../Resources/student/portugues.png"),
        rs: require("../Resources/student/ruso.png"),
      }
    };

    return roleImages.student[language] || require("../Resources/student/español.png")
  };

  return (
    <>
      <Navbar href={"/Student"} image={getImageForRoleAndLanguage()} role={"student"} />
      <div className="titleStudent">
        <h2>{t("student.title")}</h2>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loader">
            <div className="scanner">
              <span>{t("loading")}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="course-container-scroll">
          <div className="course-container">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <CourseCard
                  courseId={course.id}
                  name={course.name}
                  teacher={course.instructor}
                  creationDate={course.creation_date}
                  description={course.description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Student;
