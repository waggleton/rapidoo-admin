"use client";

import { useState } from "react";
import Link from "next/link";

interface Admin {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  vehicle_count: number;
  signup_date: string;
  mobile: string;
  wallet_ballance: number;
  documents: string;
  status: string;
  services: string;
  availability: string;
}

interface AdminDashboardProps {
  initialAdminData: Admin[]; // Changed from adminData to initialAdminData
}

const TableCustomer: React.FC<AdminDashboardProps> = ({ initialAdminData }) => {
  const [adminData, setAdminData] = useState<Admin[]>(initialAdminData); // Set local state
  const [loading, setLoading] = useState(false);

  const updateAdminStatus = async (adminId: number, newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/${adminId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus, // Sending the selected status (active, inactive, delete)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update admin status");
      }

      const updatedAdmin = await response.json();
      console.log("Admin updated successfully:", updatedAdmin);

      // Update the local state to reflect the change without reloading
      setAdminData((prevData) =>
        prevData.map((admin) =>
          admin.id === adminId ? { ...admin, status: newStatus } : admin
        )
      );
    } catch (error) {
      console.error("Error updating admin:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div
        className="grid grid-cols-12 rounded-sm bg-gray-3 dark:bg-meta-4"
        style={{
          gridTemplateColumns:
            "50px 150px 200px 100px 100px 100px 100px 150px 100px 150px 100px 100px",
        }}
      >
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">
            <input type="checkbox" className="checkbox-primary checkbox" />
          </h5>
        </div>
        <div className="whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Provider Name</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Email</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Vehicle Count</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Signup Date</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Mobile</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Wallet Balance</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Document(s)</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Manage Services</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Availability</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Status</h5>
        </div>
        <div className="whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Action</h5>
        </div>
      </div>

      {adminData.map((admin, key) => (
        <div
          className={`grid grid-cols-12 ${
            key === adminData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
          }`}
          key={admin.id}
          style={{
            gridTemplateColumns:
              "50px 150px 200px 100px 100px 100px 100px 150px 100px 150px 100px 100px",
          }}
        >
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <input type="checkbox" className="checkbox checkbox-primary" />
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-black dark:text-white">
              {admin.last_name}, {admin.first_name} {admin.middle_name}
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-black dark:text-white">{admin.email}</p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-black dark:text-white">{admin.vehicle_count}</p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-3">
              {new Date(admin.signup_date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-black dark:text-white">
              (+63) {admin.mobile}
              <br />
              <button className="btn btn-sm">Update Mobile</button>
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-5">P {admin.wallet_ballance}</p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-5">
              {admin.documents}
              <br />
              <button className="btn btn-circle" />
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-5">
              {admin.services}
              <br />
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-5">
              {admin.availability}
              <br />
              <Link href="">Edit Availability</Link>
            </p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <p className="text-xs text-meta-5">{admin.status}</p>
          </div>
          <div className="flex items-center justify-center p-2 whitespace-normal">
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="btn m-1">
                Click
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {/* Handle status update based on selection */}
                <li>
                  <a
                    onClick={() => updateAdminStatus(admin.id, "active")}
                    className={loading ? "disabled" : ""}
                  >
                    active
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => updateAdminStatus(admin.id, "inactive")}
                    className={loading ? "disabled" : ""}
                  >
                    inactive
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => updateAdminStatus(admin.id, "delete")}
                    className={loading ? "disabled" : ""}
                  >
                    delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/admin-dashboard");
  const initialAdminData = await res.json();

  return {
    props: {
      initialAdminData,
    },
  };
}

export default TableCustomer;
