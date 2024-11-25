import ProbabilityCalculator from '@/components/probability-calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          나도 계약할 수 있을까요? 🤔 확률 계산기
        </h1>
        <ProbabilityCalculator />
      </div>
    </main>
  );
}