"use client";

import { useEffect, useState } from "react";
import { fetchTripsData } from "../Api/admin";
import { fetchAdminData } from "@/components/Api/admin";
import React from 'react';
import { DatePicker } from "@nextui-org/date-picker";
import TableTripsInner from "./TableTripsInner";  // Import the new component

interface Trips {
  index: number;
  itrip_id: number;
  order_id: number;
  booked_by: string;
  booking_no: number;
  pickup_address: string;
  dropoff_address: string;
  cs_lat: number;
  cs_long: number;
  rider_lat: number;
  rider_long: number;
  distance: number;
  tripjob_date: string;
  time_request: string;
  time_end: string;
  store: string;
  provider: number; 
  customer: string;
  fare: number;
  type: string;
  transaction_type: string;
  pickup_status: string;
  dropoff_status: string;
  status: string;
}

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

const TableTrips = () => {
  const [tripsData, setTripsData] = useState<Trips[]>([]);
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);  // for pagination
  const [rowsPerPage] = useState(2);  // items per page

  const [fromDate, setFromDate] = useState(""); 
  const [toDate, setToDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    fetchTripsData(setTripsData, setLoading);
  }, []);

  useEffect(() => {
    fetchAdminData(setAdminData, setLoading); // Use the imported function
  }, []);

  if (loading) return <div>Loading...</div>;

  // Utility function to convert "mm-dd-yyyy" to a Date object
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);  // Months are 0-indexed in JS
  };

  const handleFromDate = (date: any) => {
    const formatted_date = `${date.year}-${date.month}-${date.day}`;
    setFromDate(formatted_date);
  };

  const handleToDate = (date: any) => {
    const formatted_date = `${date.year}-${date.month}-${date.day}`;
    setToDate(formatted_date);
  };

  // Filter trips based on search text and date range
  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearchText =
      trip.itrip_id.toString().includes(searchText) ||
      trip.order_id.toString().includes(searchText) ||
      trip.booking_no.toString().includes(searchText);
  
    let matchesDateRange = true;
    if (fromDate && toDate) {
      const tripDate = parseDate(trip.tripjob_date);
      const startDate = parseDate(fromDate);
      const endDate = parseDate(toDate);
      matchesDateRange = tripDate >= startDate && tripDate <= endDate;
    }
  
    const matchesStatus = status ? trip.status.toString().includes(status) : true;
    const matchesProvider = provider
      ? (adminData.find(admin => admin.id === trip.provider)?.first_name + " " + adminData.find(admin => admin.id === trip.provider)?.last_name).includes(provider)
      : true;
    const matchesCustomer = customer ? trip.customer.includes(customer) : true;
  
    return matchesSearchText && matchesDateRange && matchesStatus && matchesProvider && matchesCustomer;
  });

  const indexOfLastTrip = currentPage * rowsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const totalPages = Math.ceil(filteredTrips.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-h-screen dark:bg-boxdark-2 dark:text-bodydark">
<table>
        <thead>
          <tr>
            <th>
              <DatePicker
                label="From date"
                onChange={(e) => handleFromDate(e)}
                className="m-1 bg-black-2 dark:bg-white rounded-md w-35 h-10"
              />
            </th>
            <th>
              <DatePicker
                label="To date"
                onChange={(e) => handleToDate(e)}
                className="m-1 bg-black-2 dark:bg-white rounded-md w-35 h-10"
              />
            </th>
            <th>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10">
                  {status === "" ? "All Status" : <span>{status}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a onClick={() => setStatus("")}>All Status</a></li>
                  <li><a onClick={() => setStatus("Arrived_At_Store")}>Arrived at Store</a></li>
                  <li><a onClick={() => setStatus("On_Going_Delivery")}>On Going Delivery</a></li>
                  <li><a onClick={() => setStatus("Arrived_at_Customer")}>Arrived At Customer</a></li>
                  <li><a onClick={() => setStatus("Finished")}>Finished</a></li>
                  <li><a onClick={() => setStatus("Cancelled")}>Cancelled</a></li>
                </ul>
              </div>
            </th>
            <th className="align-bottom">
              <input
                type="text"
                placeholder="Trip/Job Number"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-4 m-1 w-35 h-12 rounded-md"
              />
            </th>
            <th>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10">
                {provider === "" ? "All Providers" : <span>{provider}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a onClick={() => setProvider("")}>All Providers</a></li>
                {tripsData.map((trips, key) => (
                  
                  <li><a onClick={() => setProvider(
                    adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                    adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown")}>
                    {
                    adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                    adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown"
                    }</a></li>
                  
                  ))}
                </ul>
              </div>
            </th>
            <th>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10">
                {customer === "" ? "All Customers" : <span>{customer}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => setCustomer("")}>All Customers</a></li>
                {tripsData.map((trips, key) => (
                  
                  <li><a onClick={() => setCustomer(trips.customer)}>{trips.customer}</a></li>
                  
                  ))}
                  </ul>          
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div tabIndex={0} role="button" className="btn m-1 w-35 h-10" >
                Search
              </div>
            </td>
            <td>
              <div tabIndex={0} onClick={() => {  
                setFromDate("")
                setToDate("")
                setSearchText("")
                setStatus("")
                setProvider("")
                setCustomer("")
                }} role="button" className="btn m-1 w-35 h-10">
                Reset
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Render TableTripsInner with required props */}
      <TableTripsInner currentTrips={currentTrips} adminData={adminData} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 border rounded-md"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableTrips;
