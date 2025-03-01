import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendStatusUpdateEmail } from '../utils/emailService';
import prisma from '../lib/prisma';

// ... (keep the existing imports and interface)

const AdminDashboard: React.FC = () => {
  // ... (keep the existing state and useEffect)

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }

    const fetchClaims = async () => {
      try {
        const storedClaims = await prisma.claim.findMany();
        setClaims(storedClaims);
      } catch (error) {
        console.error('Error fetching claims:', error);
        // Handle error (e.g., show error message to admin)
      }
    };

    fetchClaims();
  }, [user, navigate]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updatedClaim = await prisma.claim.update({
        where: { id },
        data: { status: newStatus }
      });

      setClaims(prevClaims => prevClaims.map(claim =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      ));

      // Send email notification (simulated)
      await sendStatusUpdateEmail(updatedClaim.email, updatedClaim.orderNumber, newStatus);
    } catch (error) {
      console.error('Error updating claim status:', error);
      // Handle error (e.g., show error message to admin)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default AdminDashboard;