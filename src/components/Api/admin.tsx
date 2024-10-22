import { useState } from "react";
import Link from "next/link";
const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';

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

import { useEffect } from 'react';



export const fetchAdminData = async (setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "admin_dashboard");
    const data = await response.json();
    setAdminData(data); // Assuming data is an array of admin objects
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
  } finally {
    setLoading(false);
  }
};



export async function getServerSideProps() {
    const response = await fetch(ADMIN_BASE_URL + "admin_dashboard");
    const initialAdminData = await response.json();
  
    return {
      props: {
        initialAdminData,
      },
    };
  }


export const updateAdminStatus = async (adminId: number, newStatus: string, setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "update_admin/"+ adminId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
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

export const AttemptLogIn = async (event: React.FormEvent<HTMLFormElement>, setAlertVisibility: React.Dispatch<React.SetStateAction<boolean>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setPassword: React.Dispatch<React.SetStateAction<string>>, setEmailRequired: React.Dispatch<React.SetStateAction<boolean>>, setPasswordRequired: React.Dispatch<React.SetStateAction<boolean>>) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  const formData = new FormData(form);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  console.log(email);
  console.log(password);

  const response = await fetch(ADMIN_BASE_URL + "login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: email,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    let valid = true;

    if (!email) {
      setEmailRequired(true);
      valid = false;
    } else {
      setEmailRequired(false);
    }

    if (!password) {
      setPasswordRequired(true);
      valid = false;
    } else {
      setPasswordRequired(false);
    }

    if (data.message === "login success"){
      setAlertVisibility(false);
      window.location.href = "/Dashboard"
    }
    else if (data.message === "username and password combination not found" && !email && password){
      setAlertVisibility(true);
    }
    else if (data.message === "username and password combination not found" && !password && email){
      setAlertVisibility(true);
    }
    else if (data.message === "username and password combination not found" && !email && !password){
      setAlertVisibility(false);
    }
    else{
      console.log("D:")
    }

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }


}


