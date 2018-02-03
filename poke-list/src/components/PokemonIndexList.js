import React from 'react';
import SelectItemsPerPageButtons from './SelectItemsPerPageButton';
import PaginationContainer from './PaginationContainer';
import PokeList from './PokeList';

const PokemonIndexList = ({display, options, selectedValue, allValue, onOptionSelected, listofPokemon, pageCount, activePage, onPageChange, openModal}) => {

console.log();

  let style = {display:'none'}
  if(display){
    style.display = 'intial'
  } else {
    style.display = 'none'
  }
  return (
    <div>
      <SelectItemsPerPageButtons
        options={options}
        selectedValue={selectedValue}
        allValue={allValue}
        onOptionSelected={onOptionSelected}/>
      <PokeList
        listofPokemon={listofPokemon}
        openModal={openModal}/>

      <PaginationContainer
        pageCount={pageCount}
        activePage={activePage}
        onPageChange={onPageChange}
        forcePage={activePage - 1}
      />

    </div>
  )
}

export default PokemonIndexList;
