"use client";

import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const google_redirect = () => {
  return (
    <>
    {Cookies.set("token", "tokener")}
    {window.location.href = "/Dashboard"}
    </>
  )
}

export default google_redirect