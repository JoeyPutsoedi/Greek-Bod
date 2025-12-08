import Calendar from "react-calendar";
import "../Styles/Calendar.css";
import useUserStore from "../Context/userStore.jsx";

const Calendarcomp = () => {
  const user = useUserStore((state) => state.user);
  const loginDates = user?.loginDates;

  const today = new Date().toISOString().split("T")[0];

  //function that coverts time to local time
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="userImg userImg3">
      <Calendar
        tileClassName={({ date }) => {
          const dateString = formatLocalDate(date);
          if (loginDates.includes(dateString)) {
            return "highlight";
          }
          return null;
        }}
      />
    </div>
  );
};

export default Calendarcomp;
