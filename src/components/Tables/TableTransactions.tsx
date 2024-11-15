"use client";

import { useEffect, useState } from "react";
import { fetchTransactionsnData } from "../Api/admin";
import TableTransactionsInner from "./TableTransactionsInner";

interface Transaction {
  id: number;
  account_id: number;
  rider_account_id: number;
  reference_id: string; 
  coupon: string;
  distance: number;
  sender_details: string;
  receiver_details: string;
  pickup_address: string;
  dropoff_address: string;
  multiple_dropoff: boolean;
  rebate: number;
  processing_fee: number;
  discount: number;
  transaction_amount: number;
  total_amount: number;
  tip: number;
  notes: string;
  vehicle_type: string;
  payment_method: string;
  sender_payment: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  rider_earned: number;
  rapidoo_earned: number;
  original_pickup_address: string;
  original_dropoff_address: string;
}



const TableTransactions = () => {

  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]); // Initialize as an empty array
  const [fullTransactionsData, setFullTransactionsData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);  // for pagination
  const [rowsPerPage] = useState(3);  // items per page

  const [currentTransactions, setCurrentTransactions] = useState(transactionsData)
  const totalPages = Math.ceil(transactionsData.length / rowsPerPage);

  const indexOfLastTrip = currentPage * rowsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;

  const [accountIDSearchText, setAccountIDSearchText] = useState("")
  const [riderAccountIDSearchText, setRiderAccountIDSearchText] = useState("")
  const [refIDSearchText, setRefIDSearchText] = useState("")
  const [couponSearchText, setCouponSearchText] = useState("")
  const [distanceSearchText, setDistanceSearchText] = useState("")
  const [senderSearchText, setSenderSearchText] = useState("")
  const [recieverSearchText, setRecieverSearchText] = useState("")
  const [pickupadrSearchText, setPickupAdrSearchText] = useState("")
  const [dropoffadrSearchText, setDropoffAdrSearchText] = useState("")
  const [multiDropSearchText, setMultiDropAdrSearchText] = useState("")
  const [rebateSearchText, setRebateSearchText] = useState("")
  const [processingFeeTextSearchText, setProcessingFeeSearchText] = useState("")
  const [discountSearchText, setDiscountSearchText] = useState("")
  const [transAmountSearchText, setTransAmountSearchText] = useState("")
  const [totalAmountSearchText, setTotalAmountSearchText] = useState("")
  const [tipSearchText, setTipSearchText] = useState("")
  const [notesSearchText, setNotesSearchText] = useState("")
  const [vehicleTypeSearchText, setVehicleTypeSearchText] = useState("")
  const [paymentSearchText, setPaymentSearchText] = useState("")
  const [senderPaySearchText, setSenderPaySearchText] = useState("")
  const [statusSearchText, setStatusSearchText] = useState("")
  const [createdAtSearchText, setCreatedAtSearchText] = useState("")
  const [updatedAtSearchText, setUpdatedAtSearchText] = useState("")
  const [customerNameSearchText, setCustomerNameSearchText] = useState("")
  const [riderEarnedSearchText, setRiderEarnedSearchText] = useState("")
  const [rapidooEarnedSearchText, setRapidooEarnedSearchText] = useState("")
  const [ogPickupAdrSearchText, setOgPickupAdrSearchText] = useState("")
  const [ogDropoffAdrSearchText, setOgDropoffAdrSearchText] = useState("")


// Helper function to handle null and undefined values
const safeToString = (value: string | number | boolean) => (value ?? '').toString();

const filteredTransactions = transactionsData.filter((transaction) => {
  const matchesSearchText =
    safeToString(transaction.account_id).includes(accountIDSearchText) &&
    safeToString(transaction.rider_account_id).includes(riderAccountIDSearchText) &&
    safeToString(transaction.reference_id).includes(refIDSearchText) &&
    safeToString(transaction.coupon).includes(couponSearchText) &&
    safeToString(transaction.distance).includes(distanceSearchText) &&
    safeToString(transaction.sender_details).includes(senderSearchText) &&
    safeToString(transaction.receiver_details).includes(recieverSearchText) &&
    safeToString(transaction.pickup_address).includes(pickupadrSearchText) &&
    safeToString(transaction.dropoff_address).includes(dropoffadrSearchText) &&
    safeToString(transaction.multiple_dropoff).includes(multiDropSearchText) &&
    safeToString(transaction.rebate).includes(rebateSearchText) &&
    safeToString(transaction.processing_fee).includes(processingFeeTextSearchText) &&
    safeToString(transaction.discount).includes(discountSearchText) &&
    safeToString(transaction.transaction_amount).includes(transAmountSearchText) &&
    safeToString(transaction.total_amount).includes(totalAmountSearchText) &&
    safeToString(transaction.tip).includes(tipSearchText) &&
    safeToString(transaction.notes).includes(notesSearchText) &&
    safeToString(transaction.vehicle_type).includes(vehicleTypeSearchText) &&
    safeToString(transaction.payment_method).includes(paymentSearchText) &&
    safeToString(transaction.sender_payment).includes(senderPaySearchText) &&
    safeToString(transaction.status).includes(statusSearchText) &&
    safeToString(transaction.created_at).includes(createdAtSearchText) &&
    safeToString(transaction.updated_at).includes(updatedAtSearchText) &&
    safeToString(transaction.customer_name).includes(customerNameSearchText) &&
    safeToString(transaction.rider_earned).includes(riderEarnedSearchText) &&
    safeToString(transaction.rapidoo_earned).includes(rapidooEarnedSearchText) &&
    safeToString(transaction.original_pickup_address).includes(ogPickupAdrSearchText) &&
    safeToString(transaction.original_dropoff_address).includes(ogDropoffAdrSearchText);

  return matchesSearchText;
});



  useEffect(() => {
    fetchTransactionsnData(setTransactionsData, setLoading);
    fetchTransactionsnData(setFullTransactionsData, setLoading); 
  }, []);

  useEffect(() => {
    
      setCurrentTransactions(filteredTransactions.slice(indexOfFirstTrip, indexOfLastTrip));
    
  }, [
    loading,
    accountIDSearchText,
    riderAccountIDSearchText,
    refIDSearchText,
    couponSearchText,
    distanceSearchText,
    senderSearchText,
    recieverSearchText,
    pickupadrSearchText,
    dropoffadrSearchText,
    multiDropSearchText,
    rebateSearchText,
    processingFeeTextSearchText,
    discountSearchText,
    transAmountSearchText,
    totalAmountSearchText,
    tipSearchText,
    notesSearchText,
    vehicleTypeSearchText,
    paymentSearchText,
    senderPaySearchText,
    statusSearchText,
    createdAtSearchText,
    updatedAtSearchText,
    customerNameSearchText,
    riderEarnedSearchText,
    rapidooEarnedSearchText,
    ogPickupAdrSearchText,
    ogDropoffAdrSearchText,])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-[105ch]">
                  {/* Pagination Controls */}
                  <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 text-black-2 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Next
        </button>
      </div>

      <TableTransactionsInner
      fullTransactionsData={fullTransactionsData}
      currentTransactions={currentTransactions}
      accountIDSearchText={accountIDSearchText}
      riderAccountIDSearchText={riderAccountIDSearchText}
      refIDSearchText={refIDSearchText}
      couponSearchText={couponSearchText}
      distanceSearchText={distanceSearchText}
      senderSearchText={senderSearchText}
      recieverSearchText={recieverSearchText}
      pickupadrSearchText={pickupadrSearchText}
      dropoffadrSearchText={dropoffadrSearchText}
      multiDropSearchText={multiDropSearchText}
      rebateSearchText={rebateSearchText}
      processingFeeTextSearchText={processingFeeTextSearchText}
      discountSearchText={discountSearchText}
      transAmountSearchText={transAmountSearchText}
      totalAmountSearchText={totalAmountSearchText}
      tipSearchText={tipSearchText}
      notesSearchText={notesSearchText}
      vehicleTypeSearchText={vehicleTypeSearchText}
      paymentSearchText={paymentSearchText}
      senderPaySearchText={senderPaySearchText}
      statusSearchText={statusSearchText}
      createdAtSearchText={createdAtSearchText}
      updatedAtSearchText={updatedAtSearchText}
      customerNameSearchText={customerNameSearchText}
      riderEarnedSearchText={riderEarnedSearchText}
      rapidooEarnedSearchText={rapidooEarnedSearchText}
      ogPickupAdrSearchText={ogPickupAdrSearchText}
      ogDropoffAdrSearchText={ogDropoffAdrSearchText}
      setAccountIDSearchText={setAccountIDSearchText}
      setRiderAccountIDSearchText={setRiderAccountIDSearchText}
      setRefIDSearchText={setRefIDSearchText}
      setCouponSearchText={setCouponSearchText}
      setDistanceSearchText={setDistanceSearchText}
      setSenderSearchText={setSenderSearchText}
      setRecieverSearchText={setRecieverSearchText}
      setPickupAdrSearchText={setPickupAdrSearchText}
      setDropoffAdrSearchText={setDropoffAdrSearchText}
      setMultiDropAdrSearchText={setMultiDropAdrSearchText}
      setRebateSearchText={setRebateSearchText}
      setProcessingFeeSearchText={setProcessingFeeSearchText}
      setDiscountSearchText={setDiscountSearchText}
      setTransAmountSearchText={setTransAmountSearchText}
      setTotalAmountSearchText={setTotalAmountSearchText}
      setTipSearchText={setTipSearchText}
      setNotesSearchText={setNotesSearchText}
      setVehicleTypeSearchText={setVehicleTypeSearchText}
      setPaymentSearchText={setPaymentSearchText}
      setSenderPaySearchText={setSenderPaySearchText}
      setStatusSearchText={setStatusSearchText}
      setCreatedAtSearchText={setCreatedAtSearchText}
      setUpdatedAtSearchText={setUpdatedAtSearchText}
      setCustomerNameSearchText={setCustomerNameSearchText}
      setRiderEarnedSearchText={setRiderEarnedSearchText}
      setRapidooEarnedSearchText={setRapidooEarnedSearchText}
      setOgPickupAdrSearchText={setOgPickupAdrSearchText}
      setOgDropoffAdrSearchText={setOgDropoffAdrSearchText}


        />


            {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 text-black-2 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableTransactions;
