import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../../Redux/features/student/StudentSlice";

const localizer = momentLocalizer(moment);

function SlotSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BookingData = useSelector(
    (state) => state?.student?.selectedCounselor?.bookings
  );
  const counsellorId = useSelector(
    (state) => state?.student?.selectedCounselor?.id
  );
  const CurrentStudentId = useSelector(
    (state) => state?.studentAuth?.studentDetails?.id
  );

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (BookingData) {
      const transformedEvents = BookingData.map((booking) => ({
        id: booking.id,
        title: booking.title,
        start: new Date(booking.start),
        end: new Date(booking.end),
        status: booking.status,
      }));
      setEvents(transformedEvents);
    }
  }, [BookingData]);

  const handleSelectSlot = ({ start, end }) => {
    const duration = moment(end).diff(moment(start), "minutes");

    if (duration === 30) {
      const tempSlot = { start, end, title: "Selected Slot", temp: true };
      setSelectedSlot(tempSlot);
      setEvents((prevEvents) => [
        ...prevEvents.filter((event) => !event.temp),
        tempSlot,
      ]);
    } else {
      toast.warn("Please select a 30-minute slot.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("No slot selected. Please select a slot before submitting.");
      return;
    }

    setIsSubmitting(true);

    const newEvent = {
      id: events.length,
      title: caption,
      start: selectedSlot.start,
      end: selectedSlot.end,
      status: true,
    };

    try {
      await dispatch(
        createBooking({
          data: newEvent,
          studentid: CurrentStudentId,
          counsellorId,
        })
      );

      toast.success("Appointment initiated successfully!");

      setCaption("");
      setSelectedSlot(null);

      navigate("/student/bookings", {
        state: { showBookingSuccessToast: true },
      });
    } catch (error) {
      toast.error("Failed to submit the booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventPropGetter = (event) => {
    if (event.temp) {
      return { style: { backgroundColor: "green" } };
    } else if (event.status) {
      return { style: { backgroundColor: "red" } };
    }
    return {};
  };

  const dayPropGetter = () => ({
    style: {
      cursor: "pointer",
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr,1fr] gap-4">
      <div className="w-full">
        <ToastContainer
          position="top-center"
          autoClose={700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="mb-4 font-medium uppercase">
          Please Select a Date and Time
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="month"
          views={["month", "day"]}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          selectable
          style={{
            height: "70vh",
            minHeight: 450,
            width: "100%",
          }}
          className="sm:w-full sm:h-[60vh]"
          longPressThreshold={10}
        />
      </div>
      {selectedSlot && (
        <div
          className={`${
            isMobileView ? "fixed inset-0 bg-white z-50 p-4" : ""
          } flex flex-col md:flex-row md:items-end`}
        >
          {isMobileView && (
            <button
              onClick={() => setSelectedSlot(null)}
              className="self-end text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close form"
            >
              &times;
            </button>
          )}
          <div className="w-full h-full">
            <form onSubmit={handleSubmit} className="mt-5 p-2">
              <div className="form-control mb-4 text-center bg-zinc-100 p-1 rounded-md">
                Enter Topic
              </div>
              <textarea
                className="w-full h-24 sm:h-16 p-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter a caption for your booking"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`mt-3 px-4 py-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlotSelection;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { createBooking } from "../../../../Redux/features/student/StudentSlice";

// const localizer = momentLocalizer(moment);

// function SlotBooking() {
//   const dispatch = useDispatch();

//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [caption, setCaption] = useState("");

//   const BookingData = useSelector(
//     (state) => state?.student?.selectedCounselor?.bookings
//   );
//   const counsellorId = useSelector(
//     (state) => state?.student?.selectedCounselor?.id
//   );
//   const studentId = useSelector(
//     (state) => state?.studentAuth?.studentDetails?.id
//   );

//   // Transform bookings into events
//   useEffect(() => {
//     if (BookingData) {
//       const transformedEvents = BookingData.map((booking) => ({
//         id: booking.id,
//         title: booking.title,
//         start: new Date(booking.start),
//         end: new Date(booking.end),
//         status: booking.status,
//       }));
//       setEvents(transformedEvents);
//     }
//   }, [BookingData]);

//   const handleSelectSlot = ({ start, end }) => {
//     const duration = moment(end).diff(moment(start), "minutes");

//     if (duration === 30) {
//       const tempSlot = { start, end, title: "Selected Slot", temp: true };
//       setSelectedSlot(tempSlot);
//     } else {
//       toast.warn("Please select a 30-minute time slot.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedSlot || !caption) {
//       toast.error("Please select a slot and provide a topic.");
//       return;
//     }

//     const newBooking = {
//       id: Date.now(), // Temporary unique ID
//       title: caption,
//       start: selectedSlot.start,
//       end: selectedSlot.end,
//       status: true,
//     };

//     dispatch(
//       createBooking({
//         data: newBooking,
//         studentid: studentId,
//         counsellorId,
//       })
//     );

//     toast.success("Booking successful!");
//     setSelectedSlot(null);
//     setCaption("");
//   };

//   return (
//     <div className="p-4">
//       <ToastContainer position="top-center" autoClose={1500} />

//       <div className="mb-4 text-lg font-semibold">Select a Date and Time</div>

//       <Calendar
//         localizer={localizer}
//         events={events}
//         defaultView="month"
//         views={["month", "day"]}
//         onSelectSlot={handleSelectSlot}
//         selectable
//         style={{ height: "60vh", width: "100%" }}
//       />

//       {selectedSlot && (
//         <form
//           onSubmit={handleSubmit}
//           className="mt-4 p-4 bg-gray-100 rounded-md"
//         >
//           <div className="mb-2 text-sm font-medium">
//             Selected Time:{" "}
//             <strong>
//               {moment(selectedSlot.start).format("LLL")} -{" "}
//               {moment(selectedSlot.end).format("LT")}
//             </strong>
//           </div>

//           <textarea
//             className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
//             placeholder="Enter topic for the session"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default SlotBooking;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { createBooking } from "../../../../Redux/features/student/StudentSlice";

// const localizer = momentLocalizer(moment);

// function SlotSelection() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const BookingData = useSelector(
//     (state) => state?.student?.selectedCounselor?.bookings
//   );
//   useEffect(() => {
//     const transformedEvents = BookingData?.map((booking) => ({
//       id: booking.id,
//       title: booking.title,
//       start: new Date(booking.start),
//       end: new Date(booking.end),
//       status: booking.status,
//     }));
//     setEvents(transformedEvents);
//   }, [BookingData]);
//   const [caption, setCaption] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleSelectSlot = ({ start, end }) => {
//     const duration = moment(end).diff(moment(start), "minutes");

//     if (duration === 30) {
//       const filteredEvents = events.filter((event) => !event.temp);
//       const tempSlot = { start, end, title: "Selected Slot", temp: true };
//       setSelectedSlot(tempSlot);
//       setEvents([...filteredEvents, tempSlot]);
//     } else {
//       toast.warn("Please select the date number and choose a 30-min slot");
//     }
//   };

//   const eventPropGetter = (event) => {
//     if (event.temp) {
//       return { style: { backgroundColor: "green" } };
//     } else if (event.status) {
//       return { style: { backgroundColor: "red" } };
//     }
//     return {};
//   };
//   const dispatch = useDispatch();
//   const counsellorid = useSelector(
//     (state) => state?.student?.selectedCounselor?.id
//   );
//   console.log(counsellorid, "counsellorid is hear");
//   const CurrentStudedntid = useSelector(
//     (state) => state?.studentAuth?.studentDetails?.id
//   );
//   console.log(CurrentStudedntid, "CurrentStudedntid is hear");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const filteredEvents = events.filter((event) => !event.temp);
//     const newEvent = {
//       id: events.length,
//       title: caption,
//       start: selectedSlot.start,
//       end: selectedSlot.end,
//       status: true,
//     };
//     toast.success("Appoiment Initiated");

//     console.log(newEvent, "new event zara");
//     dispatch(
//       createBooking({
//         data: newEvent,
//         studentid: CurrentStudedntid,
//         counsellorId: counsellorid,
//       })
//     );

//     navigate("/student", { state: { showBookingSuccessToast: true } });
//   };

//   const dayPropGetter = (date) => {
//     return {
//       style: {
//         cursor: "pointer",
//       },
//     };
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[5fr,1fr] gap-4">
//       <div className="w-full">
//         <ToastContainer
//           position="top-center"
//           autoClose={700}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <div className="mb-4 font-medium uppercase ">
//           Please Select A Data And Time
//         </div>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           defaultView="month"
//           views={["month", "day"]}
//           onSelectSlot={handleSelectSlot}
//           eventPropGetter={eventPropGetter}
//           dayPropGetter={dayPropGetter}
//           selectable
//           style={{ height: "70vh", minHeight: 500 ,width:"100%" }}
//         />
//       </div>
//       {selectedSlot && (
//         <div className="flex flex-col md:flex-row md:items-end">
//           <div className="w-full">
//             <form onSubmit={handleSubmit} className="mt-5 p-2">
//               <div className="form-control mb-4 text-center bg-zinc-100 p-1 rounded-md ">
//                 Enter Topic
//               </div>
//               <textarea
//                 className="w-full p-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 ease-in-out"
//                 placeholder="Enter a caption for your booking"
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 rows="15"
//                 required
//               ></textarea>
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="mt-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
//                 >
//                   Submit Booking
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SlotSelection;
