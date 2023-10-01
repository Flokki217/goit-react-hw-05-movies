import css from './SearchInput.module.css';
const SearchInput = ({ value, onChange }) => {
  return (
    <form className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search you movie"
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
