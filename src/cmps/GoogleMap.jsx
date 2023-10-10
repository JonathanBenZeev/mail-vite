import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {
    // const defaultProps = {
    //     center: {
    //         lat: 10.99835602,
    //         lng: 77.01502627
    //     },
    //     zoom: 11
    // };
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function onHandleClick({lat, lng}) {
        setCoordinates({lat, lng})
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                center={coordinates}
                defaultZoom={zoom}
                onClick={onHandleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🍎🍎🍎🍎🍎🍎"
                />
            </GoogleMapReact>
        </div>
    );
}