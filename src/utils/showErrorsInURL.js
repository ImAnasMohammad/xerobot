'use client';

import { useSearchParams } from 'next/navigation';
import { toastError } from '@/components/custom/toast';
import { useEffect, useState } from 'react';

const ShowErrors = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const error = searchParams.get('error');
      if (error) {
        setErrorMessage(error);
        toastError(error);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchParams]);

  return null;
};

export default ShowErrors;
