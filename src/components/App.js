import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification/';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handlerFeedbackButton = name => {
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = (total, good) => {
    return Math.round((good * 100) / total);
  };

  const total = countTotalFeedback();
  const percentage = countPositiveFeedbackPercentage(total, good);

  return (
    <>
      <Section title="Please leave feedback"></Section>
      <FeedbackOptions onLeaveFeedback={handlerFeedbackButton} />
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={percentage}
          />
        ) : (
          <Notification title="No feedback given" />
        )}
      </Section>
    </>
  );
}
