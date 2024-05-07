  import { useState, useMemo } from "react";
  import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
  import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import "@reach/combobox/styles.css";

  export default function Places() {
    const center = useMemo(() => ({ lat: 10.8231, lng: 106.6297 }), []);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = async () => {
      try {
        const results = await getGeocode({ address: searchValue });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        setSearchValue(results[0].formatted_address); 
      } catch (error) {
        console.error('Error searching address:', error);
      }
    };

    return (
      <div>
        <LoadScript
          googleMapsApiKey="AIzaSyBWugvX95LUjtIpZif_CGjwKzOCFufBJtc"
        >
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{ height: '400px', width: '100%' }}
            onClick={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setSelected({ lat, lng });
              getAndSetAddress({ lat, lng });
            }}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </LoadScript>
        <div className="places-container">
          <div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter an address"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    );
  }

  async function getAndSetAddress({ lat, lng }) {
    try {
      const results = await getGeocode({ location: { lat, lng } });
      if (results && results[0]) {
        setSearchValue(results[0].formatted_address); 
      }
    } catch (error) {
      console.error('Error getting address from latlng:', error);
    }
  }
