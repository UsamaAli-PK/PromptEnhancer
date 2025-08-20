import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { databaseService } from '../lib/database';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...');
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    const results: string[] = [];
    
    try {
      // Test 1: Basic connection
      results.push('Testing basic Supabase connection...');
      const { data, error } = await supabase.from('users').select('count').limit(1);
      
      if (error) {
        results.push(`❌ Connection failed: ${error.message}`);
        setConnectionStatus('Failed');
      } else {
        results.push('✅ Basic connection successful');
        
        // Test 2: Database service
        results.push('Testing database service...');
        try {
          const stats = await databaseService.getPromptStats('test-user-id');
          results.push(`✅ Database service working - Stats: ${JSON.stringify(stats)}`);
        } catch (dbError) {
          results.push(`⚠️ Database service test: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`);
        }
        
        setConnectionStatus('Connected');
      }
    } catch (error) {
      results.push(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setConnectionStatus('Failed');
    }
    
    setTestResults(results);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          connectionStatus === 'Connected' ? 'bg-green-100 text-green-800' :
          connectionStatus === 'Failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {connectionStatus}
        </span>
      </div>
      
      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="text-sm font-mono">
            {result}
          </div>
        ))}
      </div>
      
      <button
        onClick={testSupabaseConnection}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Again
      </button>
    </div>
  );
};

export default SupabaseTest;
