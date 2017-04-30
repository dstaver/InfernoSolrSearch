export default props => {
  const options = {
    relevancy: 'Mest relevant',
    price_asc: 'Laveste pris',
    price_desc: 'Høyeste pris',
  };

  const optionTags = Object.keys(options).map(key => <option value={key}>{options[key]}</option>);

  return (
    <div className="grid__col-12">
      <div className="bg-white bg-shadow pal">
        <label htmlFor="search-sort">Sortering</label>
        <select id="search-sort" onChange={props.handleChange}>
          {optionTags}
        </select>
      </div>
    </div>
  );
};
