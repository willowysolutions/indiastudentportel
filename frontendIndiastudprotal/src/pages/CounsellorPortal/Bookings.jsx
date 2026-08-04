import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import { CounsellorColumns } from "../../components/commonComponents/CounsilerCommenComponent/CouncilerColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlotes,
  approveSlote,
  rejectSlote,
} from "../../Redux/features/Counciler/CouncilerSlice";
import { MdOutlineEventNote, MdEventBusy } from "react-icons/md";
import Header from "../../components/Header";

//imports................................................................................................

const Bookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sloteData, setSloteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const councilerId = useSelector(
    (state) => state?.councilerAuth?.counsillor?.counsellor?.id
  );

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const { payload } = await dispatch(getSlotes(councilerId));
        setSloteData(payload?.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    if (councilerId) {
      fetchSlots();
    }
  }, [dispatch, councilerId]);

  // ... inside component
  const handleViewSlot = useCallback((slot) => {
    navigate(`/counsellor/booking/${slot.student_id}-${slot.id}`);
  }, [navigate]);

  const handleStatusChange = useCallback((bookingId, newStatus) => {
    setSloteData((prevData) =>
      prevData.map((slot) =>
        slot.id === bookingId ? { ...slot, status: newStatus } : slot
      )
    );
    const action = newStatus === "approved" ? approveSlote : rejectSlote;
    dispatch(action({ councilerId, bookingId }));
  }, [dispatch, councilerId]);

  const columns = useMemo(
    () => CounsellorColumns(handleViewSlot, handleStatusChange),
    [handleViewSlot, handleStatusChange]
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Bookings" Icon={MdOutlineEventNote} description="Manage your student counseling sessions and schedules." />

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500 bg-red-50/50 min-h-[200px] flex items-center justify-center">
            {error}
          </div>
        ) : sloteData.length > 0 ? (
          <div className="p-2">
            <div className="overflow-x-auto">
              <Table
                heading="List of Bookings"
                DATA={sloteData}
                COLUMNS={columns}
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-sm text-slate-500 font-medium">
              Total Bookings: <span className="text-indigo-600 font-bold">{sloteData.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6">
              <MdEventBusy className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Bookings Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              You don&apos;t have any booking requests yet. When students book a session, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
