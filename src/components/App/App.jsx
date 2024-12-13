import { useState, useEffect } from 'react';
import Options from '../Options/Options.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Notification from '../Notification/Notification.jsx';
import css from './App.module.css';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedback');
    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback);
      setGood(parsedFeedback.good);
      setNeutral(parsedFeedback.neutral);
      setBad(parsedFeedback.bad);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify({ good, neutral, bad }));
  }, [good, neutral, bad]);

  const updateFeedback = feedbackType => {
    switch (feedbackType) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        return;
    }
  };

  const resetFeedback = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  const totalFeedback = good + neutral + bad;
  const positiveFeedbackPercentage = totalFeedback
    ? Math.round((good / totalFeedback) * 100)
    : 0;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Sip Happens Café</h1>
      <p className={css.description}>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <Options
        options={['good', 'neutral', 'bad']}
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positivePercentage={positiveFeedbackPercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
}