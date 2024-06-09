import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import CourseCard from "../../Components/CourseCard";
import { useTranslation } from "react-i18next";
import { listCoursesFavorites } from "../../Services/Course";

function FavCoursesList() {
  const [coursesFav, setCoursesFav] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const { t } = useTranslation();

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

  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"student"} />
      <div className="titleStudent">
        <h2>{t("courses.title2")}</h2>
      </div>
      <div className="course-container-scroll">
        {noCourses ? (
          <div className="course-container">
            <h1 className="h1-not-courses">
              No hay cursos añadidos a favoritos
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
