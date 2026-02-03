import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import Card, { CardBody } from "~/components/ui/Card";
import ProgressBar from "~/components/ui/ProgressBar";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-400'
        : score > 49
            ? 'text-yellow-400' : 'text-red-400';

    const colorVariant = score > 70 ? 'success' : score > 49 ? 'warning' : 'error';

    return (
        <div className="flex flex-col gap-2 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-white">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-lg font-bold">
                    <span className={textColor}>{score}</span>
                    <span className="text-gray-500 text-sm">/100</span>
                </p>
            </div>
            <ProgressBar value={score} variant={colorVariant} size="sm" />
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <Card variant="glass" className="w-full">
            <CardBody className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8 border-b border-white/10 pb-8">
                    <div className="relative">
                        <ScoreGauge score={feedback.overallScore} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center mt-4">
                                <span className="text-3xl font-bold text-white">{feedback.overallScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                            Your Resume Score
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xs">
                            This score is calculated based on tone, content, structure, and skills matching the job description.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                    <Category title="Content" score={feedback.content.score} />
                    <Category title="Structure" score={feedback.structure.score} />
                    <Category title="Skills" score={feedback.skills.score} />
                </div>
            </CardBody>
        </Card>
    )
}
export default Summary
