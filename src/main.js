import Inferno from 'inferno';
import Component from 'inferno-component';
import ProductList from './ProductList';
import FacetCategories from './Facets/Categories';
import Sort from './Sort';

const SEARCH_URL = 'https://dev.finisterra.no/solrsearch';

class ProductSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'relevancy',
      query: window.INITIALSTATE.query,
      categories: window.INITIALSTATE.categories.reduce(
        (acc, val) => {
          acc[val.id] = val;
          return acc;
        },
        {}
      ),
    };
    console.log(this.state);

    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  componentDidMount() {
    console.log('ProductSearch mounted');
    this.doSearch();
  }

  onCategorySelect(event) {
    const checkbox = event.target;
    const categoryId = checkbox.value;
    const categories = Object.assign({}, this.state.categories);

    // A category is selected and isn't already in a selected state
    if (checkbox.checked && !categories[categoryId]) {
      categories[categoryId].selected = true;
      this.setState({ categories }, () => this.doSearch());
      // A category is deselected and is currently in a selected state
    } else if (!checkbox.checked && categories[categoryId]) {
      categories[categoryId].selected = true;
      this.setState({ categories }, () => this.doSearch());
    }
  }

  handleQuery(event) {
    this.setState({ query: event.target.value }, () => this.doSearch());
  }

  updateSort(event) {
    this.setState({ sort: event.target.value }, () => this.doSearch());
  }

  createSortParam() {
    let sortBy;
    switch (this.state.sort) {
      case 'price_asc':
        sortBy = 'price_f asc';
        break;
      case 'price_desc':
        sortBy = 'price_f desc';
        break;
      default:
        sortBy = 'score desc';
    }
    return `&sort=${sortBy}`;
  }

  doSearch() {
    console.log('Doing search');
    const query = (this.state.query || '*') + this.createSortParam();
    const url = `${SEARCH_URL}?q=${query}`;
    fetch(url).then(response => response.json()).then(data => {
      console.log(data);
      this.setState({
        products: data.response.docs,
      });
    });
  }

  render() {
    return (
      <div className="grid">
        <div className="grid__col-3">
          <div className="grid__cell grid__cell--padding-md bg-white bg-shadow">
            <input
              id="search-query"
              type="text"
              value={this.state.query}
              onInput={this.handleQuery}
            />
            <FacetCategories
              categories={this.state.categories}
              onCategorySelect={this.onCategorySelect}
            />
          </div>
        </div>
        <div className="grid__col-9 grid__col--bleed">
          <div className="grid">
            <Sort sortBy={this.state.sort} handleChange={this.updateSort} />
            <ProductList products={this.state.products} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = () => {
  Inferno.render(<ProductSearch />, document.getElementById('searchapp'));
  // console.log(
  //   InfernoServer.renderToString(<ProductSearch />, document.getElementById('searchapp'))
  // );
};
