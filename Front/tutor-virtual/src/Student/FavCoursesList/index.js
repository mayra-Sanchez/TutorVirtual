import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import CourseCard from "../../Components/CourseCard";

function FavCoursesList() {
  const data = [
    {
      id: 1,
      name: "profesor1",
      instructor: 1,
      creation_date: "01-02-24",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    },
    {
      id: 6,
      name: "profesor2",
      instructor: 2,
      creation_date: "01-02-24",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    },
    {
      id: 4,
      name: "profesor3",
      instructor: 3,
      creation_date: "01-02-24",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    },
  ];

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     try {
  //       setCourses(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"student"} />;
      <div className="titleStudent">
        <h2>Cursos favoritos</h2>
      </div>
      <div className="course-container-scroll">
        <div className="course-container">
          {data.map((course) => (
            <div key={course.id} className="course-card">
              {course && (
                <CourseCard
                  componet="favs"
                  courseId={course.id}
                  name={course.name}
                  teacher={course.instructor}
                  creationDate={course.creation_date}
                  description={course.description}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FavCoursesList;
