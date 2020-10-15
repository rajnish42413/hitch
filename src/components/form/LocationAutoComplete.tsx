import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form, Input } from 'antd';

interface IProps {
  setCity: any;
  setLat: any;
  setLong: any;
}
interface IState {
  address: string;
  loaded: boolean;
}

class LocationAutoComplete extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loaded: true,
      address: '',
    };
  }

  handleChange = (address: any) => {
    this.setState({ address: address });
    this.props.setCity(address);
  };

  handleSelect = (address: any) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log(latLng);
        this.props.setCity(address);
        this.props.setLat(latLng.lat);
        this.props.setLong(latLng.lng);
      })
      .catch((error) => console.error('Error', error));
  };

  render() {
    return (
      <Form.Item
        name="designation"
        rules={[{ required: true, message: 'Please input your location!' }]}
      >
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          highlightFirstSuggestion={true}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input ant-input ant-input-lg',
                })}
                value={this.state.address}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'ant-select-item ant-select-item-option active'
                    : 'suggestion-item ant-select-item ant-select-item-option';
                  const style = suggestion.active
                    ? { backgroundColor: '#ddd', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={suggestion.index}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Form.Item>
    );
  }
}

export default LocationAutoComplete;
