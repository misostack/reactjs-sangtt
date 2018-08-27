import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react'
import suggestStyle from 'styles/Suggest.scss';
class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      ren: false
    };
  }
  componentWillReceiveProps(nextProps){

  }
  getSuggestionValue = ({ name }) => name;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  render() {
    const { suggestions } = this.state;
    const { value, onChange, getSuggestions, onSelected, theme } = this.props;
    const inputProps = {
      placeholder: 'Type a name',
      value,
      onChange
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        theme={theme}
        onSuggestionsFetchRequested={ ()=> this.setState({ suggestions: getSuggestions }) }
        onSuggestionsClearRequested={ ()=> this.setState({ suggestions: [] })}
        renderSuggestion={ this.renderSuggestion }
        onSuggestionSelected={(e,b) =>onSelected(b)}
        inputProps={inputProps}
        getSuggestionValue={ this.getSuggestionValue }
      />
    );
  }
}

export default Suggest;