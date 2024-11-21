"use client";

import React, { useState } from 'react'

import { updatePassword } from '../Api/admin';
import { match } from 'assert';

interface Props {
  setShowPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string;
}

const ChangePasswordModal = ({setShowPasswordModal, userID}: Props) => {

  const[passwordLengthCheck, setPasswordLengthCheck] = useState(false);
  const[passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const[passwordHasLowercase, setPasswordHasLowercase] = useState(false);
  const[passwordHasNumber, setPasswordHasNumber] = useState(false);
  const[passwordHasSpecialChar, setPasswordHasSpecialChar] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  
  const [firstPassword, setFirstPassword] = useState("")
  const [matchPassword, setMatchPassword] = useState("")

  const checkPasswordStrength = (password: string) => {
    var checkUppercase = new RegExp('[A-Z]');
    var checkLowercase = new RegExp('[a-z]');
    var checkDigit = new RegExp('[0-9]');
    var checkPasswordLength = new RegExp('.{8}');
    var checkSpecialChar = new RegExp('[^a-zA-Z0-9]');

  
      if (checkUppercase.test(password)){
        setPasswordHasUppercase(true);
      }
      else{
        setPasswordHasUppercase(false);
      }

      if (checkLowercase.test(password)){
        setPasswordHasLowercase(true);
      }
      else{
        setPasswordHasLowercase(false);
      }

      if(checkDigit.test(password)){
        setPasswordHasNumber(true);
      }
      else{
        setPasswordHasNumber(false);
      }

      if (checkPasswordLength.test(password)){
        setPasswordLengthCheck(true);
      }
      else{
        setPasswordLengthCheck(false);
      }
      
      if (checkSpecialChar.test(password)){
        setPasswordHasSpecialChar(true);
      }
      else{
        setPasswordHasSpecialChar(false);
      }

      if(checkUppercase.test(password) && checkLowercase.test(password) && checkDigit.test(password) && checkSpecialChar.test(password) && checkPasswordLength.test(password)){
        setPasswordStrong(true)
      }
      else{
        setPasswordStrong(false)
      }
  }

  const submitPassword = () => {

    if (firstPassword === matchPassword){
      setPasswordMatch(true);
    }
    else{
      setPasswordMatch(false);
    }

    if (firstPassword){
      setPasswordRequired(false);
    }
    else{
      setPasswordRequired(true);
    }

    if (matchPassword){
      setConfirmPasswordRequired(false);
    }
    else{
      setConfirmPasswordRequired(true);
    }
    
    if (firstPassword && matchPassword && passwordMatch && passwordStrong)
    {
      console.log("huh")
      updatePassword(matchPassword, userID);
    }
  }
  
    return (

            <div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >Type New Password</label>
                    

              <div className="w-full max-w-sm min-w-[200px] mt-4">
                <div className="relative mt-2">
                  <div className="absolute top-2 left-0 flex items-center pl-3">
                  </div>
                  <input
                    type="password"
                    value={firstPassword}
                    onChange={(e) =>
                    {
                      setFirstPassword(e.target.value)
                      checkPasswordStrength(e.target.value)
                    }
                    }
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                  </div>

                  {passwordRequired && (
                    <div><span className="text-red-500 text-sm mt-1">This field is required</span></div>
                  )}

                </div>
              </div>

              <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >Confirm New Password</label>

              <div className="w-full max-w-sm min-w-[200px] mt-4">
                <div className="relative mt-2">
                  <div className="absolute top-2 left-0 flex items-center pl-3">
                  </div>
                  <input
                    type="password"
                    value={matchPassword}
                    onChange={(e) =>
                    {
                      setMatchPassword(e.target.value)
                    }
                    }
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                  </div>
                  {confirmPasswordRequired && (
                    <span className="text-red-500 text-sm mt-1">This field is required</span>
                  )}
                  {!passwordMatch && (
                    <span className="text-red-500 text-sm mt-1"><br/>The passwords do not match</span>
                  )}
                </div>
              </div>
                  
                  <div>
                  <span>Make sure that your password has:</span>

                  <ul className="list-disc px-5">

                  <li>{passwordLengthCheck ?(
                   <span className="text-green-500 text-sm mt-1">A minimum of 8 characters</span>
                  ):<span className="text-red-500 text-sm mt-1">A minimum of 8 characters</span>
                  }</li> 
                  <li>{passwordHasUppercase ?(
                   <span className="text-green-500 text-sm mt-1">Contains an uppercase letter</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains an uppercase letter</span>
                  }</li>
                  <li>{passwordHasLowercase ?(
                   <span className="text-green-500 text-sm mt-1">Contains an lowecase letter</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains an lowecase letter</span>
                  }</li>
                  <li>{passwordHasNumber ?(
                   <span className="text-green-500 text-sm mt-1">Contains a number</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains a number</span>
                  }</li> 
                  <li>{passwordHasSpecialChar ?(
                   <span className="text-green-500 text-sm mt-1">Contains a special character</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains a special character</span>
                  }</li>
                  </ul>
                </div>

              <div className="flex justify-center mt-4">
    
                {/* Navigates back to the base URL - closing the modal */}
                <button
                type="button"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={submitPassword}
                >
                  Update
                </button>
    
              </div>
            </div>

      );
}

export default ChangePasswordModal