import css from './SearchInput.module.css';
const SearchInput = ({ value, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search your movie"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
};
export default SearchInput;
