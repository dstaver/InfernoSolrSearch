export default props => {
  console.log(props);
  const items = Object.keys(props.categories).map(id => {
    if (props.categories[id].selected) {
      return (
        <label>
          <input
            type="checkbox"
            id="facet-categories"
            onChange={props.handleChange}
            selected="selected"
            value={id}
          />
          {props.categories[id].name}
        </label>
      );
    }
    return (
      <label>
        <input type="checkbox" id="facet-categories" onChange={props.handleChange} value={id} />
        {props.categories[id].name}
      </label>
    );
  });
  return (
    <div>
      <label>Produktkategorier</label>
      {items}
    </div>
  );
};
