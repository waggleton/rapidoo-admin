// Use 'use client' directive for the client component
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustomer from "@/components/Tables/TableCustomer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CustomerPage = () => {
  const [adminData, setAdminData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin-dashboard"); // Replace with your API endpoint
        const data = await response.json();
        setAdminData(data); // Assuming data is an array of admin objects
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer" />

      <div className="flex flex-col gap-10 pb-10">
        <TableCustomer initialAdminData={adminData} />
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
