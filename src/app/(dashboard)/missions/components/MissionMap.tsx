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

// Fix Leaflet default icon issue
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
}

// Custom SVG marker icon
const customIcon = new Icon({
  iconUrl: '/images/green-pin.svg',
  iconSize: [48, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

interface MissionMapProps {
  missionId: string;
  latitude: number;
  longitude: number;
  flightConfig: FlightConfig | null;
  onConfigUpdate: (config: Partial<FlightConfig>) => void;
  className?: string;
  showMarker?: boolean;
}

// Drawing Controls Component
function DrawingControls({
  onConfigUpdate,
  featureGroup,
}: { onConfigUpdate: (config: Partial<FlightConfig>) => void; featureGroup: L.FeatureGroup }) {
  console.log('DrawingControls rendered. FeatureGroup:', featureGroup);
  const map = useMap();
  const drawControlRef = useRef<L.Control.Draw | null>(null);

  useEffect(() => {
    console.log('DrawingControls useEffect triggered. FeatureGroup:', featureGroup);
    if (!map) return;

    // Remove existing draw control if it exists to ensure re-initialization
    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
      drawControlRef.current = null;
      console.log('Removed existing draw control.');
    }

    // Initialize drawing controls
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e4e8',
            message: '<strong>Error:</strong> polygon edges cannot intersect!'
          },
          shapeOptions: {
            color: '#2ea44f'
          }
        },
        polyline: {
          shapeOptions: {
            color: '#e31c1c'
          }
        },
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: featureGroup,
        remove: true
      }
    });

    // Add the control to the map
    map.addControl(drawControl);
    drawControlRef.current = drawControl;
    console.log('Added new draw control with featureGroup:', featureGroup.getLayers());

    // Handle drawing events
    map.on('draw:created', (e: any) => {
      const layer = e.layer;
      const type = e.layerType;

      if (type === 'polygon') {
        // Handle survey area
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
        // Handle flight path
        const waypoints = layer.getLatLngs().map((latLng: L.LatLng) => ({
          lat: latLng.lat,
          lng: latLng.lng,
          altitude: 50 // Default altitude
        }));
        onConfigUpdate({
          flightPath: {
            waypoints,
            altitude: 50,
            overlap: 70
          }
        });
      }

      // Add the layer to the feature group for editing
      featureGroup.addLayer(layer);
      console.log('Layer created and added to featureGroup.', featureGroup.getLayers());
    });

    // Handle edit events
    map.on('draw:edited', (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
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
          const waypoints = (layer.getLatLngs() as L.LatLng[]).map((latLng) => ({
            lat: latLng.lat,
            lng: latLng.lng,
            altitude: 50
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
      console.log('Layers edited in featureGroup.', featureGroup.getLayers());
    });

    // Handle delete events
    map.on('draw:deleted', (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          onConfigUpdate({
            surveyArea: {
              points: [],
              type: 'polygon'
            }
          });
        } else if (layer instanceof L.Polyline) {
          onConfigUpdate({
            flightPath: {
              waypoints: [],
              altitude: 50,
              overlap: 70
            }
          });
        }
      });
      console.log('Layers deleted from featureGroup.', featureGroup.getLayers());
    });

    return () => {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
        drawControlRef.current = null;
        console.log('Clean-up: Removed draw control.');
      }
    };
  }, [map, onConfigUpdate, featureGroup]);

  return null;
}

export default function MissionMap({ missionId, latitude, longitude, flightConfig, onConfigUpdate, className, showMarker = true }: MissionMapProps) {
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);
  const [featureGroupInstance, setFeatureGroupInstance] = useState<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [missionId, latitude, longitude]);

  // Effect to add existing flightConfig layers to the feature group for editing
  useEffect(() => {
    const newFeatureGroup = new L.FeatureGroup();

    if (flightConfig?.surveyArea?.points && flightConfig.surveyArea.points.length > 0) {
      const polygon = L.polygon(getSurveyAreaPositions());
      newFeatureGroup.addLayer(polygon);
    }

    if (flightConfig?.flightPath?.waypoints && flightConfig.flightPath.waypoints.length > 0) {
      const polyline = L.polyline(getFlightPathPositions());
      newFeatureGroup.addLayer(polyline);
    }
    setFeatureGroupInstance(newFeatureGroup);
  }, [flightConfig, position]); // Re-run when flightConfig or position changes

  // Convert waypoints to polyline positions
  const getFlightPathPositions = () => {
    if (!flightConfig?.flightPath?.waypoints?.length) return [];
    return (flightConfig.flightPath.waypoints as Array<{ lat: number; lng: number }>)
      .map(wp => [wp.lat, wp.lng] as [number, number]);
  };

  // Convert survey area points to polygon positions
  const getSurveyAreaPositions = () => {
    if (!flightConfig?.surveyArea?.points?.length) return [];
    return (flightConfig.surveyArea.points as Array<{ lat: number; lng: number }>)
      .map(point => [point.lat, point.lng] as [number, number]);
  };

  return (
    <div className={`w-full rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Mission Location Marker */}
        {showMarker && (
          <Marker position={position} icon={customIcon}>
            <Popup>
              Mission Location
            </Popup>
          </Marker>
        )}

        {/* Survey Area Polygon - Only show if defined in mock data */}
        {flightConfig?.surveyArea?.points && flightConfig.surveyArea.points.length > 0 && (
          <Polygon
            positions={getSurveyAreaPositions()}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
          />
        )}

        {/* Flight Path - Only show if defined in mock data */}
        {flightConfig?.flightPath?.waypoints && flightConfig.flightPath.waypoints.length > 0 && (
          <Polyline
            positions={getFlightPathPositions()}
            pathOptions={{ color: 'red', weight: 3 }}
          />
        )}

        {/* Drawing Controls */}
        <DrawingControls onConfigUpdate={onConfigUpdate} featureGroup={featureGroupInstance} />
      </MapContainer>
    </div>
  );
} 