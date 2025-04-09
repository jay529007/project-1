import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import { toast } from "react-toastify";

export const Jobpage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // display job Data logic

  useEffect(() => {
    const fetchjob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        // console.log("Fetched Data", data);
        // const selectedjob = data.find((job) => job.id === id);
        setJob(data);
      } catch (error) {
        console.log("Error fetching", error);
        setError("Failed to fetch job data.");
      } finally {
        setLoading(false);
        console.log("Done");
      }
    };

    fetchjob();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <VscLoading className="animate-spin text-6xl text-gray-500" />
      </div>
    );
  if (!job) return <div>Job not found</div>;

  // deleting job logic

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) {
      console.log("Job deletion canceled by user.");
    } else {
      try {
        console.log("Attempting to delete job with ID:", id);

        const res = await fetch(`/api/jobs/${id}`, {
          method: "DELETE",
        });
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error("Failed to delete the job");
        }
        toast.success("Job deleted successfully");
        navigate("/jobs");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Something went wrong while deleting the job");
      }
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <MdOutlineArrowBack className="text-2xl mr-2" /> Back to Jobs List
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">
                  {" "}
                  {job?.type || "Not Available"}
                </div>
                <h1 className="text-3xl font-bold mb-4">
                  {job?.title || "Not Available"}
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <p className="text-orange-700">
                    <FaMapMarkerAlt className="inline text-lg mb-1 mr-0.5" />
                    {job?.location || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job?.description || "Not Available"}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job?.salary || "Not Available"} / Year</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">
                  {job.company?.name || "Not Available"}
                </h2>

                <p className="my-2">
                  {job.company?.description || "Not Available"}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company?.contactEmail || "Not Available"}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company?.contactPhone || "Not Available"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/editjob/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => deleteJob(job.id)}
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
