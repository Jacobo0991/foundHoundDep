import { MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Markers from '../marker/Marker';

const Mapa = () => {
    return (
        <div>
            <MapContainer center={{ lat: ' 13.9833757', lng: '-89.5603108 ' }} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers></Markers>
            </MapContainer>
        </div>
    );
}

export default Mapa; 
