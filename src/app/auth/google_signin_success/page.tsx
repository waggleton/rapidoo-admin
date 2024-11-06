"use client";

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';



const google_redirect = () => {
  const [username, setUserName] = useState<string>("");
  const [useremail, setUserEmail] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {

    setUserEmail(searchParams.get('email') as string);
    setUserName(searchParams.get('user') as string);

    Cookies.set('user_name', username);
    Cookies.set('user_email', useremail);
  
});

  return (
    <>
    
    {Cookies.set("token", "tokener")}
    {window.location.href = "/Dashboard"}
    </>
  )
}

export default google_redirect