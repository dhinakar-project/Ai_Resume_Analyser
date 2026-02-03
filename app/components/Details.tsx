import { cn } from "~/lib/utils";
import Card, { CardBody } from "~/components/ui/Card";
import Badge from "~/components/ui/Badge";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const variant = score > 69 ? 'green' : score > 39 ? 'yellow' : 'red';

  return (
    <Badge variant={variant} className="flex flex-row gap-1 items-center rounded-full px-2 py-0.5">
      <div className="flex items-center gap-1">
        {score > 69 ? (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
        <span>{score}/100</span>
      </div>
    </Badge>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-xl font-semibold text-white">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-white/5 border border-white/10 w-full rounded-xl px-5 py-4 grid md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${tip.type === "good" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}>
              {tip.type === "good" ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <p className="text-gray-300 text-sm">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-xl p-4 border",
              tip.type === "good"
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${tip.type === "good" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}>
                {tip.type === "good" ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className={`text-lg font-semibold ${tip.type === "good" ? "text-green-400" : "text-red-400"}`}>
                {tip.tip}
              </p>
            </div>
            <p className="text-gray-300 pl-7">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Card variant="glass" className="w-full">
      <CardBody className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Detailed Feedback</h2>
        <div className="flex flex-col gap-4 w-full">
          <Accordion>
            <AccordionItem id="tone-style">
              <AccordionHeader itemId="tone-style">
                <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="tone-style">
                <CategoryContent tips={feedback.toneAndStyle.tips} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem id="content">
              <AccordionHeader itemId="content">
                <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="content">
                <CategoryContent tips={feedback.content.tips} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem id="structure">
              <AccordionHeader itemId="structure">
                <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="structure">
                <CategoryContent tips={feedback.structure.tips} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem id="skills">
              <AccordionHeader itemId="skills">
                <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="skills">
                <CategoryContent tips={feedback.skills.tips} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardBody>
    </Card>
  );
};

export default Details;
