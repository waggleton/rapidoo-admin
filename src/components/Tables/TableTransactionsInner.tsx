import React, { useState } from 'react'
import TextModal from '../Modal/TextModal';

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

  interface TableTransactionsInnerProps {
    fullTransactionsData: Transaction[];
    currentTransactions: Transaction[];
    accountIDSearchText: string;
    riderAccountIDSearchText: string;
    refIDSearchText: string;
    couponSearchText: string;
    distanceSearchText: string;
    senderSearchText: string;
    recieverSearchText: string;
    pickupadrSearchText: string;
    dropoffadrSearchText: string;
    multiDropSearchText: string;
    rebateSearchText: string;
    processingFeeTextSearchText: string;
    discountSearchText: string;
    transAmountSearchText: string;
    totalAmountSearchText: string;
    tipSearchText: string;
    notesSearchText: string;
    vehicleTypeSearchText: string;
    paymentSearchText: string;
    senderPaySearchText: string;
    statusSearchText: string;
    createdAtSearchText: string;
    updatedAtSearchText: string;
    customerNameSearchText: string;
    riderEarnedSearchText: string;
    rapidooEarnedSearchText: string;
    ogPickupAdrSearchText: string;
    ogDropoffAdrSearchText: string;
    setAccountIDSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRiderAccountIDSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRefIDSearchText: React.Dispatch<React.SetStateAction<string>>;
    setCouponSearchText: React.Dispatch<React.SetStateAction<string>>;
    setDistanceSearchText: React.Dispatch<React.SetStateAction<string>>;
    setSenderSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRecieverSearchText: React.Dispatch<React.SetStateAction<string>>;
    setPickupAdrSearchText: React.Dispatch<React.SetStateAction<string>>;
    setDropoffAdrSearchText: React.Dispatch<React.SetStateAction<string>>;
    setMultiDropAdrSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRebateSearchText: React.Dispatch<React.SetStateAction<string>>;
    setProcessingFeeSearchText: React.Dispatch<React.SetStateAction<string>>;
    setDiscountSearchText: React.Dispatch<React.SetStateAction<string>>;
    setTransAmountSearchText: React.Dispatch<React.SetStateAction<string>>;
    setTotalAmountSearchText: React.Dispatch<React.SetStateAction<string>>;
    setTipSearchText: React.Dispatch<React.SetStateAction<string>>;
    setNotesSearchText: React.Dispatch<React.SetStateAction<string>>;
    setVehicleTypeSearchText: React.Dispatch<React.SetStateAction<string>>;
    setPaymentSearchText: React.Dispatch<React.SetStateAction<string>>;
    setSenderPaySearchText: React.Dispatch<React.SetStateAction<string>>;
    setStatusSearchText: React.Dispatch<React.SetStateAction<string>>;
    setCreatedAtSearchText: React.Dispatch<React.SetStateAction<string>>;
    setUpdatedAtSearchText: React.Dispatch<React.SetStateAction<string>>;
    setCustomerNameSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRiderEarnedSearchText: React.Dispatch<React.SetStateAction<string>>;
    setRapidooEarnedSearchText: React.Dispatch<React.SetStateAction<string>>;
    setOgPickupAdrSearchText: React.Dispatch<React.SetStateAction<string>>;
    setOgDropoffAdrSearchText: React.Dispatch<React.SetStateAction<string>>;
  }

const TableTransactionsInner: React.FC<TableTransactionsInnerProps> = ({
    fullTransactionsData, 
    currentTransactions,
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
    ogDropoffAdrSearchText,
    setAccountIDSearchText,
    setRiderAccountIDSearchText,
    setRefIDSearchText,
    setCouponSearchText,
    setDistanceSearchText,
    setSenderSearchText,
    setRecieverSearchText,
    setPickupAdrSearchText,
    setDropoffAdrSearchText,
    setMultiDropAdrSearchText,
    setRebateSearchText,
    setProcessingFeeSearchText,
    setDiscountSearchText,
    setTransAmountSearchText,
    setTotalAmountSearchText,
    setTipSearchText,
    setNotesSearchText,
    setVehicleTypeSearchText,
    setPaymentSearchText,
    setSenderPaySearchText,
    setStatusSearchText,
    setCreatedAtSearchText,
    setUpdatedAtSearchText,
    setCustomerNameSearchText,
    setRiderEarnedSearchText,
    setRapidooEarnedSearchText,
    setOgPickupAdrSearchText,
    setOgDropoffAdrSearchText
}) => {

    const [showTextModal, setShowTextModal] = useState<number | null>(null);
    const uniquePaymentMethods = Array.from(
        new Set(fullTransactionsData.map(transaction => transaction.payment_method))
      );
      const allVehicleTypes = Array.from(
        new Set(fullTransactionsData.map(transaction => transaction.vehicle_type))
      );
      const allSenderPaymentTypes = Array.from(
        new Set(fullTransactionsData.map(transaction => transaction.sender_payment))
      );


    const extractPickupDetails = (input: string) => {
        // Match the content within the "pickup" object
        const pickupRegex = /"pickup":\s*{([^}]*)}/;
        const match = input.match(pickupRegex);
        
        if (match) {
          // Capture only the key-value pairs inside "pickup"
          const innerContent = match[1];
      
          // Extract the "description", "address", "latitude", and "longitude" values
          const descriptionMatch = innerContent.match(/"description":\s*"([^"]*)"/);
          const addressMatch = innerContent.match(/"address":\s*"([^"]*)"/);
          const latitudeMatch = innerContent.match(/"latitude":\s*([\d.]+)/);
          const longitudeMatch = innerContent.match(/"longitude":\s*([\d.]+)/);
      
          // Format the extracted values
          const description = descriptionMatch ? descriptionMatch[1] : '';
          const address = addressMatch ? addressMatch[1] : '';
          const latitude = latitudeMatch ? latitudeMatch[1] : '';
          const longitude = longitudeMatch ? longitudeMatch[1] : '';
      
          return `${description},\n${address},\nlatitude: ${latitude},\nlongitude: ${longitude}`;
        }
      
        return '';
      }
    
      const extractSenderDetails = (input: string) => {
          // Match sender details
          const senderNameMatch = input.match(/"sender_name":\s*"([^"]*)"/);
          const senderPhoneMatch = input.match(/"sender_phonenumber":\s*(\d+)/);
    
          // Extract sender details or use default empty string if not found
          const senderName = senderNameMatch ? senderNameMatch[1] : '';
          const senderPhone = senderPhoneMatch ? senderPhoneMatch[1] : '';
    
          // Match receiver details
          const receiverNameMatch = input.match(/"receiver_name":\s*"([^"]*)"/);
          const receiverPhoneMatch = input.match(/"receiver_phonenumber":\s*(\d+)/);
    
          // Extract receiver details or use default empty string if not found
          const receiverName = receiverNameMatch ? receiverNameMatch[1] : '';
          const receiverPhone = receiverPhoneMatch ? receiverPhoneMatch[1] : '';
    
          // If both sender and receiver are missing details, return a message
          if ((!senderName && !senderPhone) && (!receiverName && !receiverPhone)) {
            return 'Sender and Receiver details are missing.';
          }
    
          // Format the extracted details
          let result = '';
          
          if (senderName || senderPhone) {
            result += `${senderName},\n${senderPhone}\n`;
          } else {
          }
    
          if (receiverName || receiverPhone) {
            result += `${receiverName},\n${receiverPhone}\n`;
          } else {
          }
    
          return result.trim();
      }
    
      const extractDropoffDetails = (dropoff_details: string, multiple_dropoff: boolean) => {
        const dropoffDetails = JSON.parse(dropoff_details).dropoff;
        
        const description = dropoffDetails.description;
        const address = dropoffDetails.address;
        const latitude = dropoffDetails.latitude;
        const longitude = dropoffDetails.longitude;
        const isMultipleDrop = dropoffDetails.isMultipleDrop;
      
        // If multiple_dropoff is 0, format the details for a single drop-off
        if (!multiple_dropoff) {
          return `
            Description: ${description},
            Address: ${address},
            Latitude: ${latitude},
            Longitude: ${longitude}
          `.trim();
        }
        
        // If multiple_dropoff is 1, format the details for multiple drop-offs
        if (multiple_dropoff) {
          // Parse the multiple drop-offs details from the string
          const multipleDropoffs = JSON.parse(isMultipleDrop);
          
          let result = `Description: ${description},\nAddress: ${address},\nLatitude: ${latitude},\nLongitude: ${longitude}\n\nMultiple Drop-offs:\n`;
          
          // Iterate through each multiple drop-off and format its details
          multipleDropoffs.forEach((dropoff: any) => {
            result += `
              ID: ${dropoff.id},
              Name: ${dropoff.multipleName},
              Address: ${dropoff.multipleAddress},
              Latitude: ${dropoff.multipleLatitude},
              Longitude: ${dropoff.multipleLongitude},
              Contact Name: ${dropoff.multipleCName || "N/A"},
              Contact Number: ${dropoff.multipleCNumber || "N/A"},
              Status: ${dropoff.status}\n
            `;
          });
          
          return result.trim();
        }
        
        return 'Invalid multiple_dropoff value';
      }

      const filteredTransactions = currentTransactions.filter((transaction) => {
        const matchesAccountID =
          transaction.account_id.toString().toLowerCase().includes(accountIDSearchText.toLowerCase());
      });


    //   Search Filters
      const filteredCustomers = currentTransactions.filter((transaction) => {
    const matchesSearchText =
      transaction.account_id.toString().toLowerCase().includes(accountIDSearchText.toLowerCase());

      return matchesSearchText
  });
      
  return (
    <div className="overflow-x-auto max-w-[105ch] border border-black-2">
    <table className="table dark:bg-black-2 bg-white rounded-none border border-black-2 ">
    <thead>
        <tr className="bg-gray-400 text-black-2">
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Account ID</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Rider Account ID</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Reference ID</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Coupon</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Distance</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Sender Details</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Reciever Details</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Pickup Address</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Dropoff Address</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Multiple Dropoff</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Rebate</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Processing Fee</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Discount</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Transaction Amount</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Total Amount</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Tip</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Notes</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Vehicle Type</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Payment Method</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Sender Payment</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Status</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Created At</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Updated At</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Customer Name</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Rider Earned</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Rapidoo Earned</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Original Pickup Address</h5>
        </th>
        <th className="text-center truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Original Dropoff Address</h5>
        </th>

      </tr>
      <tr className="bg-gray-400 text-black-2">
      <th className="align-bottom  border-black-2">
              <input
                type="text"
                placeholder="Account ID"
                value={accountIDSearchText}
                onChange={(e) => setAccountIDSearchText(e.target.value)}
                className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
              />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Rider Account ID"
            value={riderAccountIDSearchText}
            onChange={(e) => setRiderAccountIDSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Reference ID"
            value={refIDSearchText}
            onChange={(e) => setRefIDSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Coupon"
            value={couponSearchText}
            onChange={(e) => setCouponSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Distance"
            value={distanceSearchText}
            onChange={(e) => setDistanceSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Sender Details"
            value={senderSearchText}
            onChange={(e) => setSenderSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Reciever Details"
            value={recieverSearchText}
            onChange={(e) => setRecieverSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Pickup Address"
            value={pickupadrSearchText}
            onChange={(e) => setPickupAdrSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Dropoff Address"
            value={dropoffadrSearchText}
            onChange={(e) => setDropoffAdrSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Multiple Dropoff"
            value={multiDropSearchText}
            onChange={(e) => setMultiDropAdrSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Rebate"
            value={rebateSearchText}
            onChange={(e) => setRebateSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Processing Fee"
            value={processingFeeTextSearchText}
            onChange={(e) => setProcessingFeeSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Discount"
            value={discountSearchText}
            onChange={(e) => setDiscountSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Transaction Amount"
            value={transAmountSearchText}
            onChange={(e) => setTransAmountSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Total Amount"
            value={totalAmountSearchText}
            onChange={(e) => setTotalAmountSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Tip"
            value={tipSearchText}
            onChange={(e) => setTipSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Notes"
            value={notesSearchText}
            onChange={(e) => setNotesSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
        <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10 bg-gray-300 border-2 border-black-2">
                {paymentSearchText === "" ? "All Vehicles" : <span>{vehicleTypeSearchText}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => setVehicleTypeSearchText("")}>All Vehicles</a></li>
                {allVehicleTypes.map((vehicle, key) => (
                  
                  <li><a onClick={() => {setVehicleTypeSearchText(vehicle) }}>
                    {vehicle}
                    </a></li>
                  
                  ))}
                  </ul>          
              </div>
        </th>
        <th className="align-bottom  border-black-2">

            <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10 bg-gray-300 border-2 border-black-2">
                {paymentSearchText === "" ? "All Payment Methods" : <span>{paymentSearchText}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => setPaymentSearchText("")}>All Payment Methods</a></li>
                {uniquePaymentMethods.map((paymentMethod, key) => (
                  
                  <li><a onClick={() => {setPaymentSearchText(paymentMethod) }}>
                    {paymentMethod}
                    </a></li>
                  
                  ))}
                  </ul>          
              </div>
        </th>
        <th className="align-bottom  border-black-2">

            <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10 bg-gray-300 border-2 border-black-2">
                {paymentSearchText === "" ? "All Sender Payments" : <span>{senderPaySearchText}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => setSenderPaySearchText("")}>All Sender Payments</a></li>
                {allSenderPaymentTypes.map((senderPayment, key) => (
                  
                  <li><a onClick={() => {setSenderPaySearchText(senderPayment) }}>
                    {senderPayment}
                    </a></li>
                  
                  ))}
                  </ul>          
              </div>
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Status"
            value={statusSearchText}
            onChange={(e) => setStatusSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Created At"
            value={createdAtSearchText}
            onChange={(e) => setCreatedAtSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Updated At"
            value={updatedAtSearchText}
            onChange={(e) => setUpdatedAtSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Customer Name"
            value={customerNameSearchText}
            onChange={(e) => setCustomerNameSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Rider Earned"
            value={riderEarnedSearchText}
            onChange={(e) => setRiderEarnedSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Rapidoo Earned"
            value={rapidooEarnedSearchText}
            onChange={(e) => setRapidooEarnedSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Original Pickup Address"
            value={ogPickupAdrSearchText}
            onChange={(e) => setOgPickupAdrSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
        <th className="align-bottom  border-black-2">
            <input
            type="text"
            placeholder="Original Dropoff Address"
            value={ogDropoffAdrSearchText}
            onChange={(e) => setOgDropoffAdrSearchText(e.target.value)}
            className="p-4 m-1 w-25 h-12 rounded-md border-2 border-black-2"
            />
        </th>
      </tr>
      </thead>

      <tbody>
      {currentTransactions.map((transaction, key) => (

        <tr className="bg-gray-300 dark:bg-black-2 text-black-2 dark:text-gray-200">
          
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.account_id}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.rider_account_id}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.reference_id}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.coupon}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.distance}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {extractSenderDetails(transaction.sender_details)}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {extractSenderDetails(transaction.receiver_details)}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {extractPickupDetails(transaction.pickup_address)}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
          <button className="btn btn-sm border border-black-2" 
              onClick={() => setShowTextModal(transaction.id)}>Show Details</button>
            {showTextModal === transaction.id && <TextModal text={extractDropoffDetails(transaction.dropoff_address, transaction.multiple_dropoff)} setShowTextModal={setShowTextModal} />}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.multiple_dropoff}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.rebate}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.processing_fee}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.discount}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.transaction_amount}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.total_amount}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.tip}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.notes}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.vehicle_type}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.payment_method}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.sender_payment}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.status}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.created_at}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.updated_at}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.customer_name}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.rider_earned}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.rapidoo_earned}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.original_pickup_address}
          </td>
          <td className=" items-center justify-center text-center truncate whitespace-normal p-2">
            {transaction.original_dropoff_address}
          </td>
          
        </tr>
      ))}

      </tbody>
      </table>
      </div>
  )
}

export default TableTransactionsInner