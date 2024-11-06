"use client";

import { useState } from "react";
import Link from "next/link";
const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { signIn, getSession, signOut } from 'next-auth/react';


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
  initialAdminData: Admin[]; 
}



export const fetchAdminData = async (setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "admin_dashboard");
    const data = await response.json();
    setAdminData(data); 
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

export const updateUserMobile = async (adminId: number, mobileNumber: string) => {
  try {
    const response = await fetch(ADMIN_BASE_URL + "update_mobile/"+ adminId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobileNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin status");
    }

    const updatedAdmin = await response.json();
    console.log("Admin updated successfully:", updatedAdmin);

  


  } catch (error) {
    console.error("Error updating admin:", error);
  } finally {

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

    if (data.message === "login success") {
      Cookies.set("token", data.token);
      Cookies.set("user_name", data.name);
      Cookies.set("user_email", email)
      setAlertVisibility(false);
      window.location.href = "/#";
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
    else if (data.message === "username and password combination not found" && email && password){
      setAlertVisibility(true);
    }
    else{
      console.log("D:")
    }

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }


}

export const AttemptRegister = async(setNameRequired : React.Dispatch<React.SetStateAction<boolean>>, setEmailRequired : React.Dispatch<React.SetStateAction<boolean>>, setPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setPasswordStrong : React.Dispatch<React.SetStateAction<boolean>>, setConfirmPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setMatchPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setShowRegisteredAlert : React.Dispatch<React.SetStateAction<boolean>>,  nameRequired : boolean, emailRequired : boolean, passwordRequired : boolean, confirmPasswordRequired : boolean, confirmMatchPasswordRequired : boolean, email : string, name: string, firstPassword: string, matchPassword: string) => {

  const user_email = email;
  const user_name = name;
  const first_password = firstPassword;
  const match_password = matchPassword;

  console.log(email);
  console.log(name);
  console.log(firstPassword);
  console.log(matchPassword);


  if (!email) {
    setEmailRequired(true);
  } else {
    setEmailRequired(false);
  }

  if (!name) {
    setNameRequired(true);
  } else {
    setNameRequired(false);
  }

  if (!firstPassword) {
    setPasswordRequired(true);
  } else {
    setPasswordRequired(false);
    var password_strength = checkPasswordStrength(first_password);
    if (password_strength == "password_strong"){
      setPasswordStrong(false);
    }
    else {
      setPasswordStrong(true);
    }
  }

  if (!matchPassword) {
    setConfirmPasswordRequired(true);
  } else {
    
    if(first_password != match_password){
      setPasswordRequired(false);
      setConfirmPasswordRequired(false);
      setMatchPasswordRequired(true);
    }
    else{
      setMatchPasswordRequired(false);
    }
  
    setConfirmPasswordRequired(false);
  }


  if(nameRequired == false && emailRequired == false && confirmMatchPasswordRequired == false){

  const response = await fetch(ADMIN_BASE_URL + "register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: match_password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    if (data.message == "already registered"){
      setShowRegisteredAlert(true);
    }
    else{

      Cookies.set("token", data.token);
      Cookies.set("user_name", name);
      Cookies.set("user_email", email); 
      window.location.href = "/#";

    }
    

  }
  else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }
  }

}

function checkPasswordStrength(password: string) {
  var checkUppercase = new RegExp('[A-Z]');
  var checkLowercase = new RegExp('[a-z]');
  var checkDigit = new RegExp('[0-9]');
  var checkPasswordLength = new RegExp('.{8}');
  var checkSpecialChar = new RegExp('[^a-zA-Z0-9]');

  if(checkUppercase.test(password) && checkLowercase.test(password) && checkDigit.test(password) && checkSpecialChar.test(password) && checkPasswordLength.test(password)){
    return "password_strong"
  }
  else{
    return "password_weak"
}
}

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    
    Cookies.remove('token');
    Cookies.remove('user_name');
    Cookies.remove('user_email');

    signOut();
   
    router.push('/auth/signin');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    >
      <svg
        className="fill-current"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
          fill=""
        />
        <path
          d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
          fill=""
        />
      </svg>
      <span className="text-primary">Log Out</span>
    </button>
  );
}


export const gmailSignIn = async (email: string ) => {
  try {
    const response = await fetch(ADMIN_BASE_URL + "google_signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();

    if (response.ok) {

      if (data.message == "email found"){
        return true
      }
      else if (data.message == "email not found"){
        return false
      }

    } else {
      console.error("API login failed");
    }
  } catch (error) {
    console.error("An error occurred while posting login data:", error);
  }
  
};


