import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
// import PokeList from './components/PokeList';
import { Col } from 'react-bootstrap';
// import ReactPaginate from 'react-paginate';
// import SelectItemsPerPageButtons from './components/SelectItemsPerPageButton'
import PokemonIndexList from './components/PokemonIndexList'
import PokemonModal from './components/PokemonModal'

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
      count: 0,
      loaded:false,
      showModal: false,
      selectedPokemon: null
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
          loaded: true
        })
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
  handleModalOpen(pokemon) {
    if(pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
      .then(response => {
        return response.json()
      }).then(json => {
        console.log(json);

        this.setState({
          selectedPokemon: json,
          showModal:true
        })
      }).catch(ex => {
        console.log("Parsing Failed ", ex);

      })
    }
    this.setState({
      showModal: true
    })
  }
  handleModalClose() {
    this.setState({
      showModal: false
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pokemon List App</h1>
        </header>
        {this.state.loaded ? null : "Loading..."}
        <PokemonIndexList
          display={this.state.loaded}
          options={['10','50','100','200']}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listofPokemon={this.state.pokemon}
          pageCount={this.state.totalPages}
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationSelect}
          openModal={this.handleModalOpen}
          selectedPokemon={this.state.selectedPokemon}
        />

        <PokemonModal closeModal={this.handleModalClose} showModal={this.state.showModal} pokemon={this.state.selectedPokemon}/>
      </div>


    );
  }
}

export default App;
