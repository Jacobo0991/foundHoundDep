import { Marker } from 'react-leaflet';
import L from "leaflet";
import icon from "../../img/icon.png";

const markerIcon = new L.Icon({
    iconUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
});

const Markers = () => {
    return(
        <Marker position={{lat: '13.9833757', lng: '-89.5603108'}} icon={markerIcon}></Marker>
        );
}

export default Markers;