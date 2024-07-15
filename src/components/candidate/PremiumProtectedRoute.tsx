import React, { useState, useEffect } from 'react';
import CommunityChat from '../../pages/candidate/CommunityChat';
import Subscribe from '../../pages/candidate/Subscribe';
import { isCandidatePremium } from '../../api/candidateApi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PTzVcDL3WwyDt3nw5J7hsR65uM813YRjDbx2c1Gg3JIx038zLlVv3dSNrT18VXFmmOzvYFatSEkUAEXUv4Qk6yu00PJ0ISlCr"); // starts with pk_

const PremiumProtectedRoute = () => {

  const [isPremium, setIsPremium] = useState<boolean>();

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const response = await isCandidatePremium();
      setIsPremium(response.success)
      } catch (error) {
        setIsPremium(false)
      }
    };
    checkPremiumStatus();
  }, []);

  if (isPremium === null) {
    return null; // Or a loading spinner
  }


  return isPremium ? (
    <CommunityChat />
  ) : (
    <Elements stripe={stripePromise}>
      <Subscribe />
    </Elements>
  );
};

export default PremiumProtectedRoute
