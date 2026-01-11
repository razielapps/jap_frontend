// src/components/Hooks/usePortfolio.ts
import { useState, useEffect } from 'react';
import { portfolioAPI, ME } from '../../lib/api';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<ME | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioAPI.getPortfolio();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return {
    portfolio,
    loading,
    error,
    refetch: fetchPortfolio,
  };
};