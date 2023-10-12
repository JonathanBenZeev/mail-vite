import GoogleMapReact from 'google-map-react';
// import {API_key} from '../key.js'
import { GiPositionMarker } from "react-icons/gi";


const Marker = () => <div style={{ color: 'red', fontSize: '30px' }}><GiPositionMarker/></div>;

export const GoogleMap = ({ lat, lng }) => {
	const zoom = 12;

	return (
		<div style={{ height: '50%', width: '50%' }}>
			{/* <GoogleMapReact
				bootstrapURLKeys={{ key: API_key }}
				defaultCenter={{ lat, lng }}
				defaultZoom={zoom}
			>
				<Marker text={'Marker'} lat={lat} lng={lng} />
			</GoogleMapReact> */}
		</div>
	);
};
