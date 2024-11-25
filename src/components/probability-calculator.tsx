'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface Inputs {
  M: string;
  N: string;
  P: string;
}

const ProbabilityCalculator = () => {
  const [inputs, setInputs] = useState<Inputs>({
    M: '',
    N: '',
    P: ''
  });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Factorial calculation
  const factorial = (n: number): number => {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  // Combination calculation
  const combination = (n: number, r: number): number => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  // Calculate probability
  const calculateProbability = (M: number, N: number, p: number): number => {
    let probability = 0;
    
    // Calculate sum for k from 0 to M-1
    for (let k = 0; k < M; k++) {
      const term = combination((M+N-1), k) * Math.pow(p, k) * Math.pow(1 - p, (M+N-1) - k);
      probability += term;
    }
    
    return probability;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    const M = parseInt(inputs.M);
    const N = parseInt(inputs.N);
    const P = parseFloat(inputs.P);

    if (isNaN(M) || isNaN(N) || isNaN(P)) {
      setError('모든 값을 올바르게 입력해주세요.');
      return;
    }

    if (P < 0 || P > 1) {
      setError('확률 P는 0과 1 사이의 값이어야 합니다.');
      return;
    }

    if (M <= 0 || N < 0) {
      setError('M과 N은 양수여야 합니다.');
      return;
    }

    setError('');
    const prob = calculateProbability(M, N, P);
    setResult(prob);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>예비 돌 확률 계산기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">당첨자 수 (M)</label>
            <Input 
              type="number"
              value={inputs.M}
              onChange={(e) => setInputs({...inputs, M: e.target.value})}
              placeholder="내 주거타입의 공급 호수(= 당첨자 수)를 입력하세요"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">내 예비 번호 (N)</label>
            <Input 
              type="number"
              value={inputs.N}
              onChange={(e) => setInputs({...inputs, N: e.target.value})}
              placeholder="내 예비 번호를 입력하세요"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">계약 확률 (P)</label>
            <Input 
              type="number"
              step="0.01"
              value={inputs.P}
              onChange={(e) => setInputs({...inputs, P: e.target.value})}
              placeholder="앞 사람들의 계약 확률을 0과 1 사이로 입력하세요"
            />
          </div>

          <Button type="submit" className="w-full">계산하기</Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result !== null && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-center">
              나에게 계약 기회가 올 확률: {(result * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProbabilityCalculator;