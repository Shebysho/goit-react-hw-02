import css from './Options.module.css';

export default function Options({
  options,
  onLeaveFeedback,
  onReset,
  totalFeedback,
}) {
  return (
    <div>
      <ul className={css.list}>
        {options.map(option => (
          <li key={option}>
            <button
              type="button"
              className={css.button}
              onClick={() => onLeaveFeedback(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {totalFeedback > 0 && (
        <button type="button" className={css.button} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}