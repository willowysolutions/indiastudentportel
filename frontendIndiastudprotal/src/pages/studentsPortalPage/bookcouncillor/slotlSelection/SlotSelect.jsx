import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../../Redux/features/student/StudentSlice";
import "./index.css"; // Ensure custom styles are imported

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
      return { style: { backgroundColor: "#305EAC" } }; // custom-indigo
    } else if (event.status) {
      return { style: { backgroundColor: "#ef4444" } }; // red-500
    }
    return {};
  };

  const dayPropGetter = () => ({
    style: {
      cursor: "pointer",
    },
  });

  return (
    <div className="bg-white rounded-xl p-6 m-4 overflow-hidden">
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

      <div
        className={`grid grid-cols-1 ${
          selectedSlot ? "md:grid-cols-[3fr,1fr]" : "md:grid-cols-1"
        } gap-8 transition-all duration-300 ease-in-out`}
      >
        {/* Calendar Section */}
        <div className="w-full">
          <div className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wide border-b pb-2">
            Select Date & Time
          </div>
          <div className="calendar-container">
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
                height: "65vh",
                minHeight: 500,
                width: "100%",
              }}
              className="font-sans text-gray-700"
              longPressThreshold={10}
            />
          </div>
        </div>

        {/* Selected Slot Form Section */}
        {selectedSlot && (
          <div
            className={`${
              isMobileView
                ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                : "flex flex-col justify-center h-full"
            }`}
          >
            <div
              className={`${
                isMobileView
                  ? "bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
                  : "w-full bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-inner"
              }`}
            >
              {isMobileView && (
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    Confirm Booking
                  </h3>
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                    aria-label="Close form"
                  >
                    &times;
                  </button>
                </div>
              )}

              {!isMobileView && (
                <div className="bg-custom-indigo/10 text-custom-indigo font-semibold p-3 rounded-lg mb-6 text-center">
                  Book Appointment
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selected Time
                  </label>
                  <div className="text-sm text-gray-600 bg-white border border-gray-200 p-2 rounded-md">
                    {moment(selectedSlot.start).format("MMMM Do YYYY, h:mm a")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason / Topic
                  </label>
                  <textarea
                    className="w-full h-32 p-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 focus:border-custom-indigo transition-all resize-none shadow-sm"
                    placeholder="Briefly describe the topic..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full py-2.5 px-4 flex justify-center items-center gap-2 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-custom-indigo hover:bg-indigo-700 active:scale-95"
                    } text-white font-medium rounded-lg shadow-md transition-all duration-200`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlotSelection;
