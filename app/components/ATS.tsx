import Card, { CardBody } from "~/components/ui/Card";
import Badge from "~/components/ui/Badge";
import ProgressBar from "~/components/ui/ProgressBar";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine colors based on score
  const colorVariant = score > 69
    ? 'success'
    : score > 49
      ? 'warning'
      : 'error';

  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <Card variant="glass" className="w-full">
      <CardBody className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent mb-2">
              ATS Score & Analysis
            </h2>
            <p className="text-gray-400">
              How well your resume performs in Applicant Tracking Systems
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white mb-1">{score}<span className="text-2xl text-gray-500">/100</span></div>
            <Badge variant={colorVariant === 'success' ? 'green' : colorVariant === 'warning' ? 'yellow' : 'red'}>
              {subtitle}
            </Badge>
          </div>
        </div>

        <div className="mb-8">
          <ProgressBar value={score} variant={colorVariant} size="lg" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Implementation Tips</h3>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border flex gap-4 ${suggestion.type === 'good'
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-red-500/10 border-red-500/20'
                }`}
            >
              <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${suggestion.type === 'good' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {suggestion.type === 'good' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-medium mb-1 ${suggestion.type === 'good' ? 'text-green-300' : 'text-red-300'
                  }`}>
                  {suggestion.type === 'good' ? 'Strength' : 'Improvement'}
                </p>
                <p className="text-gray-300 text-sm">{suggestion.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ATS;
