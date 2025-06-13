/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Icon, LatLngExpression } from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import { FlightConfig } from '../../../../types/FlightConfig';

// This block is crucial for Leaflet to correctly display marker icons.
// Without it, Leaflet might try to fetch default marker images from a non-existent path,
// leading to broken marker icons on the map. It re-points the icon URLs to local assets.
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
}

// Defines a custom marker icon using an SVG image.
// This icon is used to denote the main mission location on the map.
const customIcon = new Icon({
  iconUrl: '/images/green-pin.svg', // Path to your custom SVG icon
  iconSize: [48, 48], // Size of the icon [width, height]
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

/**
 * Props for the MissionMap component.
 * @interface MissionMapProps
 * @param {string} missionId - The unique identifier for the mission. Used to re-center the map if the mission changes.
 * @param {number} latitude - The latitude of the mission's central point.
 * @param {number} longitude - The longitude of the mission's central point.
 * @param {FlightConfig | null} flightConfig - The current flight configuration data (survey area, flight path).
 * @param {(config: Partial<FlightConfig>) => void} onConfigUpdate - Callback function to update the flight configuration.
 * @param {string} [className] - Optional CSS class names for styling the map container.
 * @param {boolean} [showMarker] - Optional flag to control visibility of the main mission marker. Defaults to true.
 */
interface MissionMapProps {
  missionId: string;
  latitude: number;
  longitude: number;
  flightConfig: FlightConfig | null;
  onConfigUpdate: (config: Partial<FlightConfig>) => void;
  className?: string;
  showMarker?: boolean;
}

/**
 * Handles Leaflet drawing and editing events. This component is responsible for
 * initializing the Leaflet-Draw control and processing the drawn/edited shapes
 * to update the mission's flight configuration.
 * It expects to be rendered within a `react-leaflet` `MapContainer` to access the map instance via `useMap()`.
 * @param {object} props
 * @param {(config: Partial<FlightConfig>) => void} props.onConfigUpdate - Callback to update parent's flightConfig state.
 * @param {L.FeatureGroup} props.featureGroup - Leaflet FeatureGroup to which drawn/edited layers are added.
 */
function DrawingControls({
  onConfigUpdate,
  featureGroup,
}: { onConfigUpdate: (config: Partial<FlightConfig>) => void; featureGroup: L.FeatureGroup }) {
  // console.log('DrawingControls rendered. FeatureGroup:', featureGroup); // Debug log
  const map = useMap(); // Access the Leaflet map instance from the context
  const drawControlRef = useRef<L.Control.Draw | null>(null); // Ref to store the Leaflet-Draw control instance

  useEffect(() => {
    // console.log('DrawingControls useEffect triggered. FeatureGroup:', featureGroup); // Debug log
    if (!map) return; // Ensure map instance is available

    // Clean up function: Removes the draw control when the component unmounts or dependencies change.
    return () => {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
        drawControlRef.current = null;
        // console.log('Clean-up: Removed draw control.'); // Debug log
      }
    };
  }, [map]); // Only re-run if the map instance changes

  // Effect to initialize and manage Leaflet-Draw events.
  // This effect sets up event listeners for shape creation, editing, and deletion.
  useEffect(() => {
    if (!map || !featureGroup) return;

    // If a draw control already exists (e.g., from a previous render), remove it
    // to prevent multiple controls being added or issues with re-initialization.
    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
      drawControlRef.current = null;
      // console.log('Removed existing draw control.'); // Debug log
    }

    // Initialize the Leaflet-Draw control with desired options.
    const drawControl = new L.Control.Draw({
      position: 'topright', // Position of the drawing toolbar on the map
      draw: {
        polygon: {
          allowIntersection: false, // Prevent polygon self-intersections
          drawError: {
            color: '#e1e4e8',
            message: '<strong>Error:</strong> polygon edges cannot intersect!'
          },
          shapeOptions: {
            color: '#2ea44f' // Color for the polygon when drawing
          }
        },
        polyline: {
          shapeOptions: {
            color: '#e31c1c' // Color for the polyline when drawing
          }
        },
        circle: false,      // Disable circle drawing
        rectangle: false,   // Disable rectangle drawing
        marker: false,      // Disable default marker drawing
        circlemarker: false // Disable circle marker drawing
      },
      edit: {
        featureGroup: featureGroup, // The FeatureGroup that contains editable layers
        remove: true // Allow removal of layers
      }
    });

    // Add the initialized draw control to the map.
    map.addControl(drawControl);
    drawControlRef.current = drawControl; // Store the control instance in the ref
    // console.log('Added new draw control with featureGroup:', featureGroup.getLayers()); // Debug log

    /**
     * Event handler for 'draw:created' event.
     * Triggered when a new shape (polygon or polyline) is finished drawing on the map.
     * Extracts coordinates and updates the flight configuration.
     * @param {any} e - The event object from Leaflet-Draw.
     */
    const handleDrawCreated = (e: any) => {
      const layer = e.layer;
      const type = e.layerType;

      if (type === 'polygon') {
        // Process a newly drawn polygon (survey area)
        const points = layer.getLatLngs()[0].map((latLng: L.LatLng) => ({
          lat: latLng.lat,
          lng: latLng.lng
        }));
        onConfigUpdate({
          surveyArea: {
            points,
            type: 'polygon'
          }
        });
      } else if (type === 'polyline') {
        // Process a newly drawn polyline (flight path)
        const waypoints = layer.getLatLngs().map((latLng: L.LatLng) => ({
          lat: latLng.lat,
          lng: latLng.lng,
          altitude: 50 // Default altitude for new waypoints
        }));
        onConfigUpdate({
          flightPath: {
            waypoints,
            altitude: 50,
            overlap: 70
          }
        });
      }
      // Add the newly created layer to the feature group, making it editable.
      featureGroup.addLayer(layer);
      // console.log('Layer created and added to featureGroup.', featureGroup.getLayers()); // Debug log
    };

    /**
     * Event handler for 'draw:edited' event.
     * Triggered when existing shapes on the map are edited (e.g., vertices moved).
     * Iterates through edited layers and updates their respective configurations.
     * @param {any} e - The event object from Leaflet-Draw.
     */
    const handleDrawEdited = (e: any) => {
      const layers = e.layers; // Collection of layers that were edited
      layers.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          // Process an edited polygon
          const points = ((layer.getLatLngs()[0] as L.LatLng[])).map((latLng) => ({
            lat: latLng.lat,
            lng: latLng.lng
          }));
          onConfigUpdate({
            surveyArea: {
              points,
              type: 'polygon'
            }
          });
        } else if (layer instanceof L.Polyline) {
          // Process an edited polyline
          const waypoints = (layer.getLatLngs() as L.LatLng[]).map((latLng) => ({
            lat: latLng.lat,
            lng: latLng.lng,
            altitude: 50 // Retain default altitude or fetch existing if available
          }));
          onConfigUpdate({
            flightPath: {
              waypoints,
              altitude: 50,
              overlap: 70
            }
          });
        }
      });
      // console.log('Layers edited in featureGroup.', featureGroup.getLayers()); // Debug log
    };

    /**
     * Event handler for 'draw:deleted' event.
     * Triggered when shapes are deleted from the map using the draw controls.
     * Clears the corresponding flight configuration data.
     * @param {any} e - The event object from Leaflet-Draw.
     */
    const handleDrawDeleted = (e: any) => {
      const layers = e.layers; // Collection of layers that were deleted
      layers.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          // Clear survey area if a polygon was deleted
          onConfigUpdate({
            surveyArea: {
              points: [],
              type: 'polygon'
            }
          });
        } else if (layer instanceof L.Polyline) {
          // Clear flight path if a polyline was deleted
          onConfigUpdate({
            flightPath: {
              waypoints: [],
              altitude: 50,
              overlap: 70
            }
          });
        }
      });
      // console.log('Layers deleted from featureGroup.', featureGroup.getLayers()); // Debug log
    };

    // Attach event listeners to the map instance
    map.on('draw:created', handleDrawCreated);
    map.on('draw:edited', handleDrawEdited);
    map.on('draw:deleted', handleDrawDeleted);

    // Clean up function: Removes event listeners when the component unmounts or dependencies change.
    return () => {
      map.off('draw:created', handleDrawCreated);
      map.off('draw:edited', handleDrawEdited);
      map.off('draw:deleted', handleDrawDeleted);
      // console.log('Clean-up: Removed draw event listeners.'); // Debug log
    };
  }, [map, onConfigUpdate, featureGroup]); // Re-run if map, onConfigUpdate, or featureGroup changes

  return null; // This component doesn't render any visible UI directly
}

/**
 * MissionMap component displays an interactive Leaflet map with drone mission details.
 * It shows the mission's central location, and allows drawing/editing of survey areas and flight paths.
 * @param {MissionMapProps} props - The properties for the MissionMap component.
 */
export default function MissionMap({ missionId, latitude, longitude, flightConfig, onConfigUpdate, className, showMarker = true }: MissionMapProps) {
  // State to manage the map's center position. Updates when missionId or coordinates change.
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);
  // State to hold the Leaflet FeatureGroup instance, which manages layers for drawing/editing controls.
  const [featureGroupInstance, setFeatureGroupInstance] = useState<L.FeatureGroup>(new L.FeatureGroup());

  // Effect to update the map's center position when missionId or coordinates change.
  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [missionId, latitude, longitude]);

  // Effect to populate the Leaflet FeatureGroup with existing flightConfig layers.
  // This ensures that previously saved survey areas and flight paths are visible
  // and editable when the map loads.
  useEffect(() => {
    const newFeatureGroup = new L.FeatureGroup();

    // If survey area points exist, create a Leaflet Polygon and add to the feature group.
    if (flightConfig?.surveyArea?.points && flightConfig.surveyArea.points.length > 0) {
      const polygon = L.polygon(getSurveyAreaPositions());
      newFeatureGroup.addLayer(polygon);
    }

    // If flight path waypoints exist, create a Leaflet Polyline and add to the feature group.
    if (flightConfig?.flightPath?.waypoints && flightConfig.flightPath.waypoints.length > 0) {
      const polyline = L.polyline(getFlightPathPositions());
      newFeatureGroup.addLayer(polyline);
    }
    setFeatureGroupInstance(newFeatureGroup); // Update the state with the new feature group
  }, [flightConfig, position]); // Re-run this effect when flightConfig or position changes

  /**
   * Converts flight path waypoints from FlightConfig format to Leaflet LatLngExpression array.
   * This format is required by the <Polyline> component.
   * @returns {LatLngExpression[]} An array of [latitude, longitude] pairs.
   */
  const getFlightPathPositions = (): LatLngExpression[] => {
    if (!flightConfig?.flightPath?.waypoints?.length) return [];
    return (flightConfig.flightPath.waypoints as Array<{ lat: number; lng: number }>)
      .map(wp => [wp.lat, wp.lng] as [number, number]);
  };

  /**
   * Converts survey area points from FlightConfig format to Leaflet LatLngExpression array.
   * This format is required by the <Polygon> component.
   * @returns {LatLngExpression[]} An array of [latitude, longitude] pairs.
   */
  const getSurveyAreaPositions = (): LatLngExpression[] => {
    if (!flightConfig?.surveyArea?.points?.length) return [];
    return (flightConfig.surveyArea.points as Array<{ lat: number; lng: number }>)
      .map(point => [point.lat, point.lng] as [number, number]);
  };

  return (
    // Main container for the map, applying responsive styling and overflow handling.
    <div className={`w-full rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={position} // Initial map center
        zoom={13} // Initial zoom level
        scrollWheelZoom={true} // Enable zooming with scroll wheel
        style={{ height: '100%', width: '100%' }} // Ensure map fills its container
      >
        {/* TileLayer: Defines the base map tiles (OpenStreetMap in this case) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Mission Location Marker: Displays a marker at the mission's central coordinates */}
        {showMarker && (
          <Marker position={position} icon={customIcon}>
            {/* Popup content displayed when the marker is clicked */}
            <Popup>
              Mission Location
            </Popup>
          </Marker>
        )}

        {/* Survey Area Polygon: Renders the defined survey area as a filled polygon */}
        {/* Only rendered if surveyArea points exist in the flightConfig */}
        {flightConfig?.surveyArea?.points && flightConfig.surveyArea.points.length > 0 && (
          <Polygon
            positions={getSurveyAreaPositions()} // Coordinates for the polygon
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }} // Styling for the polygon
          />
        )}

        {/* Flight Path: Renders the defined flight path as a polyline */}
        {/* Only rendered if flightPath waypoints exist in the flightConfig */}
        {flightConfig?.flightPath?.waypoints && flightConfig.flightPath.waypoints.length > 0 && (
          <Polyline
            positions={getFlightPathPositions()} // Coordinates for the polyline
            pathOptions={{ color: 'red', weight: 3 }} // Styling for the polyline
          />
        )}

        {/* Drawing Controls: Component to enable drawing and editing of shapes on the map */}
        <DrawingControls onConfigUpdate={onConfigUpdate} featureGroup={featureGroupInstance} />
      </MapContainer>
    </div>
  );
} 