import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokeList from './components/PokeList';
import { Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      pokemon: [],
      activePage: 0,
      limit: 20,
      offset: 0,
      totalPages: 0
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
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
    console.log(selectedPage );
    let offset = this.state.limit * selectedPage.selected;
    console.log(offset);

    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
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

        <Col sm={8} md={10} smOffset={2} mdOffset={1}>
          <PokeList listofPokemon={this.state.pokemon} />
        </Col>
        <Col sm={9} smOffset={2}>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageCount={this.state.totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={5}
            onPageChange={this.handlePaginationSelect}
          />
        </Col>
      </div>
    );
  }
}

export default App;
