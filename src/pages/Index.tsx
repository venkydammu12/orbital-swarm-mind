import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Legacy Index page - redirects to Landing
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
