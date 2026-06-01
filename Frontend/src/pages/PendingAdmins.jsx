import { useEffect, useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

const PendingAdmins = () => {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PENDING ADMINS
  // =========================
  const fetchPendingAdmins = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "/Admin/pending-admins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setAdmins(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to fetch pending admins");

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // APPROVE ADMIN
  // =========================
  const approveAdmin = async (adminId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `/Admin/approve/${adminId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Admin approved successfully");

      // refresh list
      fetchPendingAdmins();

    } catch (error) {

      console.error(error);

      toast.error("Failed to approve admin");

    }
  };

  // =========================
  // REJECT / SET PENDING
  // =========================
  const rejectAdmin = async (adminId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `/Admin/reject/${adminId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Admin rejected");

      fetchPendingAdmins();

    } catch (error) {

      console.error(error);

      toast.error("Failed to reject admin");

    }
  };

  // =========================
  // INITIAL FETCH
  // =========================
  useEffect(() => {

    fetchPendingAdmins();

  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-4xl font-bold text-slate-900">
              Pending Admin Approvals
            </h1>

            <p className="mt-2 text-slate-600">
              Review and manage admin approval requests.
            </p>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="flex justify-center items-center py-20">

              <div className="text-lg font-semibold text-gray-600">
                Loading pending admins...
              </div>

            </div>

          ) : admins.length === 0 ? (

            // EMPTY STATE
            <div className="bg-white rounded-3xl shadow-md p-10 text-center">

              <h2 className="text-2xl font-semibold text-green-600">
                No Pending Admins
              </h2>

              <p className="mt-2 text-gray-500">
                All admin requests are reviewed.
              </p>

            </div>

          ) : (

            // ADMIN TABLE
            <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">

              <table className="min-w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Full Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {admins.map((admin) => (

                    <tr
                      key={admin.id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-4 font-medium text-slate-800">
                        {admin.fullName}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {admin.email}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {admin.phoneNumber}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                          PENDING
                        </span>
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-3">

                          {/* APPROVE BUTTON */}
                          <button
                            onClick={() => approveAdmin(admin.id)}
                            className="rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition"
                          >
                            Approve
                          </button>

                          {/* REJECT BUTTON */}
                          <button
                            onClick={() => rejectAdmin(admin.id)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition"
                          >
                            Reject
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default PendingAdmins;