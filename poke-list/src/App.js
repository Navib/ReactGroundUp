import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokeList from './components/PokeList';
import { Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SelectItemsPerPageButtons from './components/SelectItemsPerPageButton'

class App extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }
  loadPokemon(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        let pages = Math.round(json.count / this.state.limit);
        this.setState({
          pokemon:json.results,
          totalPages: pages,
          count: json.count,
        })
        console.log(this.state);
      }).catch(err => {
        console.log(err);
      })
  }
  handlePaginationSelect(selectedPage) {
    let offset = this.state.limit * selectedPage.selected;
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: selectedPage
    })
  }
  handleLimitChange(event) {
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
    })
  }
  componentWillMount() {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/`);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SelectItemsPerPageButtons options={[10,50,100,200]} selectedValue={this.state.limit} allValue={this.state.count} onOptionSelected={this.handleLimitChange}/>
        <Col sm={8} md={10} smOffset={2} mdOffset={1}>
          <PokeList listofPokemon={this.state.pokemon} />
        </Col>
        <Col sm={9} smOffset={2}>
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            breakLabel={<a href="">...</a>}
            pageCount={this.state.totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={5}
            onPageChange={this.handlePaginationSelect}
            forcePage={this.state.activePage - 1}
          />
        </Col>
      </div>
    );
  }
}

export default App;
