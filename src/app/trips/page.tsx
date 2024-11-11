"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustomer from "@/components/Tables/TableCustomer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchAdminData } from "@/components/Api/admin";
import TableTrips from "@/components/Tables/TableTripsOuter";

const TripsPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Trips" />

      <div className="max-h-screen">
        <TableTrips />
      </div>
    </DefaultLayout>
  );
};

export default TripsPage;
