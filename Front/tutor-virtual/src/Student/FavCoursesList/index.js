import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import CourseCard from "../../Components/CourseCard";
import { useTranslation } from "react-i18next";
import { listCoursesFavorites } from "../../Services/Course";

function FavCoursesList() {
  const [coursesFav, setCoursesFav] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const { t, i18n } = useTranslation();

  const fetchData = async () => {
    try {
      const data = await listCoursesFavorites();
      if (data.length === 0) {
        setNoCourses(true);
      } else {
        setNoCourses(false);
        setCoursesFav(data);
      }
      console.log("courses", data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    // setLoading(true);
    fetchData();
  }, []);

  const getImageForRoleAndLanguage = () => {
    const language = i18n.language;
    const roleImages = {
      student: {
        en: require("../../Resources/student/ingles.png"),
        fr: require("../../Resources/student/frances.png"),
        es: require("../../Resources/student/español.png"),
        de: require("../../Resources/student/aleman.png"),
        md: require("../../Resources/student/mandarin.png"),
        hd: require("../../Resources/student/hindi.png"),
        pt: require("../../Resources/student/portugues.png"),
        rs: require("../../Resources/student/ruso.png"),
      }
    };

    return roleImages.student[language] || require("../../Resources/student/español.png")
  };

  return (
    <>
      <Navbar href={"/Student"} image={getImageForRoleAndLanguage()} role={"student"} />
      <div className="titleStudent">
        <h2>{t("courses.title2")}</h2>
      </div>
      <div className="course-container-scroll">
        {noCourses ? (
          <div className="course-container">
            <h1 className="h1-not-courses">
              {t("courses.coursesFAVnot")}
            </h1>
          </div>
        ) : (
          <div className="course-container">
            {coursesFav.map((course) => (
              <div key={course.id} className="course-card">
                {course && (
                  <CourseCard
                    componet="favs"
                    courseId={course.course}
                    name={course.name}
                    teacher={course.instructor}
                    creationDate={course.creation_date}
                    description={course.description}
                    onCourseDeleted={fetchData}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FavCoursesList;
