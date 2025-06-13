import { Mission } from '../context/MissionContext';

export const mockMissions: Mission[] = [
  {
    id: '1',
    name: 'Golden Gate Bridge Survey',
    status: 'completed',
    drone: 'DJI Phantom 4',
    latitude: 37.8199,
    longitude: -122.4783,
    startTime: '2024-02-13T10:00:00Z',
    updatedAt: '2024-02-13T11:30:00Z',
    createdAt: '2024-02-13T09:00:00Z',
    description: 'Comprehensive survey of the Golden Gate Bridge structure and surrounding areas',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 37.8199, lng: -122.4783 },
          { lat: 37.8249, lng: -122.4833 },
          { lat: 37.8149, lng: -122.4833 },
          { lat: 37.8149, lng: -122.4733 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 37.8199, lng: -122.4783, altitude: 50 },
          { lat: 37.8249, lng: -122.4833, altitude: 50 },
          { lat: 37.8149, lng: -122.4833, altitude: 50 },
          { lat: 37.8149, lng: -122.4733, altitude: 50 },
          { lat: 37.8199, lng: -122.4783, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'NDVI']
      }
    }
  },
  {
    id: '2',
    name: 'Eiffel Tower Inspection',
    status: 'in-progress',
    drone: 'DJI Mavic 3',
    latitude: 48.8584,
    longitude: 2.2945,
    startTime: '2024-02-13T14:00:00Z',
    createdAt: '2024-02-13T13:00:00Z',
    updatedAt: '2024-02-13T15:30:00Z',
    description: 'Detailed inspection of the Eiffel Tower structure and surrounding areas',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 48.8584, lng: 2.2945 },
          { lat: 48.8634, lng: 2.2995 },
          { lat: 48.8534, lng: 2.2995 },
          { lat: 48.8534, lng: 2.2895 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 48.8584, lng: 2.2945, altitude: 40 },
          { lat: 48.8634, lng: 2.2995, altitude: 40 },
          { lat: 48.8534, lng: 2.2995, altitude: 40 },
          { lat: 48.8534, lng: 2.2895, altitude: 40 },
          { lat: 48.8584, lng: 2.2945, altitude: 40 }
        ],
        altitude: 40,
        overlap: 80
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'Thermal']
      }
    }
  },
  {
    id: '3',
    name: 'Taj Mahal Survey',
    status: 'pending',
    drone: 'DJI Phantom 4',
    latitude: 27.1751,
    longitude: 78.0421,
    startTime: '2024-02-14T09:00:00Z',
    createdAt: '2024-02-14T08:00:00Z',
    description: 'Complete survey of the Taj Mahal complex and gardens',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 27.1751, lng: 78.0421 },
          { lat: 27.1801, lng: 78.0471 },
          { lat: 27.1701, lng: 78.0471 },
          { lat: 27.1701, lng: 78.0371 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 27.1751, lng: 78.0421, altitude: 60 },
          { lat: 27.1801, lng: 78.0471, altitude: 60 },
          { lat: 27.1701, lng: 78.0471, altitude: 60 },
          { lat: 27.1701, lng: 78.0371, altitude: 60 },
          { lat: 27.1751, lng: 78.0421, altitude: 60 }
        ],
        altitude: 60,
        overlap: 60
      },
      dataCollection: {
        frequency: 3,
        resolution: 'low',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '4',
    name: 'Great Wall of China',
    status: 'in-progress',
    drone: 'DJI Mavic 3 Pro',
    latitude: 40.4319,
    longitude: 116.5704,
    startTime: '2024-02-14T11:00:00Z',
    createdAt: '2024-02-14T10:00:00Z',
    updatedAt: '2024-02-14T12:30:00Z',
    description: 'Survey of the Great Wall section and surrounding terrain',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 40.4319, lng: 116.5704 },
          { lat: 40.4369, lng: 116.5754 },
          { lat: 40.4269, lng: 116.5754 },
          { lat: 40.4269, lng: 116.5654 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 40.4319, lng: 116.5704, altitude: 55 },
          { lat: 40.4369, lng: 116.5754, altitude: 55 },
          { lat: 40.4269, lng: 116.5754, altitude: 55 },
          { lat: 40.4269, lng: 116.5654, altitude: 55 },
          { lat: 40.4319, lng: 116.5704, altitude: 55 }
        ],
        altitude: 55,
        overlap: 75
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'Multispectral']
      }
    }
  },
  {
    id: '5',
    name: 'Sydney Opera House',
    status: 'completed',
    drone: 'DJI Inspire 2',
    latitude: -33.8568,
    longitude: 151.2153,
    startTime: '2024-02-13T08:00:00Z',
    createdAt: '2024-02-13T07:00:00Z',
    updatedAt: '2024-02-13T09:30:00Z',
    description: 'Detailed survey of the Sydney Opera House and harbor surroundings',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -33.8568, lng: 151.2153 },
          { lat: -33.8518, lng: 151.2203 },
          { lat: -33.8618, lng: 151.2203 },
          { lat: -33.8618, lng: 151.2103 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -33.8568, lng: 151.2153, altitude: 45 },
          { lat: -33.8518, lng: 151.2203, altitude: 45 },
          { lat: -33.8618, lng: 151.2203, altitude: 45 },
          { lat: -33.8618, lng: 151.2103, altitude: 45 },
          { lat: -33.8568, lng: 151.2153, altitude: 45 }
        ],
        altitude: 45,
        overlap: 85
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'NDVI', 'Thermal']
      }
    }
  },
  {
    id: '6',
    name: 'Pyramids of Giza',
    status: 'in-progress',
    drone: 'DJI Mavic 3',
    latitude: 29.9792,
    longitude: 31.1342,
    startTime: '2024-02-14T13:00:00Z',
    createdAt: '2024-02-14T12:00:00Z',
    updatedAt: '2024-02-14T14:30:00Z',
    description: 'Survey of the Pyramids of Giza and surrounding archaeological sites',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 29.9792, lng: 31.1342 },
          { lat: 29.9842, lng: 31.1392 },
          { lat: 29.9742, lng: 31.1392 },
          { lat: 29.9742, lng: 31.1292 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 29.9792, lng: 31.1342, altitude: 50 },
          { lat: 29.9842, lng: 31.1392, altitude: 50 },
          { lat: 29.9742, lng: 31.1392, altitude: 50 },
          { lat: 29.9742, lng: 31.1292, altitude: 50 },
          { lat: 29.9792, lng: 31.1342, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '7',
    name: 'Machu Picchu Survey',
    status: 'pending',
    drone: 'DJI Phantom 4',
    latitude: -13.1631,
    longitude: -72.5450,
    startTime: '2024-02-15T10:00:00Z',
    createdAt: '2024-02-15T09:00:00Z',
    description: 'Comprehensive survey of Machu Picchu ruins and surrounding mountains',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -13.1631, lng: -72.5450 },
          { lat: -13.1581, lng: -72.5400 },
          { lat: -13.1681, lng: -72.5400 },
          { lat: -13.1681, lng: -72.5500 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -13.1631, lng: -72.5450, altitude: 70 },
          { lat: -13.1581, lng: -72.5400, altitude: 70 },
          { lat: -13.1681, lng: -72.5400, altitude: 70 },
          { lat: -13.1681, lng: -72.5500, altitude: 70 },
          { lat: -13.1631, lng: -72.5450, altitude: 70 }
        ],
        altitude: 70,
        overlap: 60
      },
      dataCollection: {
        frequency: 3,
        resolution: 'low',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '8',
    name: 'Petra Ruins',
    status: 'in-progress',
    drone: 'DJI Mavic 3 Pro',
    latitude: 30.3285,
    longitude: 35.4444,
    startTime: '2024-02-14T15:00:00Z',
    createdAt: '2024-02-14T14:00:00Z',
    updatedAt: '2024-02-14T16:30:00Z',
    description: 'Detailed survey of Petra archaeological site and rock formations',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 30.3285, lng: 35.4444 },
          { lat: 30.3335, lng: 35.4494 },
          { lat: 30.3235, lng: 35.4494 },
          { lat: 30.3235, lng: 35.4394 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 30.3285, lng: 35.4444, altitude: 40 },
          { lat: 30.3335, lng: 35.4494, altitude: 40 },
          { lat: 30.3235, lng: 35.4494, altitude: 40 },
          { lat: 30.3235, lng: 35.4394, altitude: 40 },
          { lat: 30.3285, lng: 35.4444, altitude: 40 }
        ],
        altitude: 40,
        overlap: 80
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'Thermal']
      }
    }
  },
  {
    id: '9',
    name: 'Angkor Wat Temple',
    status: 'completed',
    drone: 'DJI Inspire 2',
    latitude: 13.4125,
    longitude: 103.8660,
    startTime: '2024-02-13T07:00:00Z',
    createdAt: '2024-02-13T06:00:00Z',
    updatedAt: '2024-02-13T08:30:00Z',
    description: 'Complete survey of Angkor Wat temple complex and surrounding structures',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 13.4125, lng: 103.8660 },
          { lat: 13.4175, lng: 103.8710 },
          { lat: 13.4075, lng: 103.8710 },
          { lat: 13.4075, lng: 103.8610 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 13.4125, lng: 103.8660, altitude: 50 },
          { lat: 13.4175, lng: 103.8710, altitude: 50 },
          { lat: 13.4075, lng: 103.8710, altitude: 50 },
          { lat: 13.4075, lng: 103.8610, altitude: 50 },
          { lat: 13.4125, lng: 103.8660, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'NDVI']
      }
    }
  },
  {
    id: '10',
    name: 'Christ the Redeemer',
    status: 'in-progress',
    drone: 'DJI Mavic 3',
    latitude: -22.9519,
    longitude: -43.2105,
    startTime: '2024-02-14T16:00:00Z',
    createdAt: '2024-02-14T15:00:00Z',
    updatedAt: '2024-02-14T17:30:00Z',
    description: 'Survey of Christ the Redeemer statue and surrounding landscape',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -22.9519, lng: -43.2105 },
          { lat: -22.9469, lng: -43.2055 },
          { lat: -22.9569, lng: -43.2055 },
          { lat: -22.9569, lng: -43.2155 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -22.9519, lng: -43.2105, altitude: 60 },
          { lat: -22.9469, lng: -43.2055, altitude: 60 },
          { lat: -22.9569, lng: -43.2055, altitude: 60 },
          { lat: -22.9569, lng: -43.2155, altitude: 60 },
          { lat: -22.9519, lng: -43.2105, altitude: 60 }
        ],
        altitude: 60,
        overlap: 60
      },
      dataCollection: {
        frequency: 3,
        resolution: 'low',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '11',
    name: 'Santorini Coastline',
    status: 'pending',
    drone: 'DJI Phantom 4',
    latitude: 36.3932,
    longitude: 25.4615,
    startTime: '2024-02-15T11:00:00Z',
    createdAt: '2024-02-15T10:00:00Z',
    description: 'Survey of Santorini coastline and caldera formations',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 36.3932, lng: 25.4615 },
          { lat: 36.3982, lng: 25.4665 },
          { lat: 36.3882, lng: 25.4665 },
          { lat: 36.3882, lng: 25.4565 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 36.3932, lng: 25.4615, altitude: 50 },
          { lat: 36.3982, lng: 25.4665, altitude: 50 },
          { lat: 36.3882, lng: 25.4665, altitude: 50 },
          { lat: 36.3882, lng: 25.4565, altitude: 50 },
          { lat: 36.3932, lng: 25.4615, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'Multispectral']
      }
    }
  },
  {
    id: '12',
    name: 'Maldives Atoll Survey',
    status: 'in-progress',
    drone: 'DJI Mavic 3 Pro',
    latitude: 3.2028,
    longitude: 73.2207,
    startTime: '2024-02-14T17:00:00Z',
    createdAt: '2024-02-14T16:00:00Z',
    updatedAt: '2024-02-14T18:30:00Z',
    description: 'Survey of Maldives atoll and coral reef formations',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 3.2028, lng: 73.2207 },
          { lat: 3.2078, lng: 73.2257 },
          { lat: 3.1978, lng: 73.2257 },
          { lat: 3.1978, lng: 73.2157 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 3.2028, lng: 73.2207, altitude: 45 },
          { lat: 3.2078, lng: 73.2257, altitude: 45 },
          { lat: 3.1978, lng: 73.2257, altitude: 45 },
          { lat: 3.1978, lng: 73.2157, altitude: 45 },
          { lat: 3.2028, lng: 73.2207, altitude: 45 }
        ],
        altitude: 45,
        overlap: 85
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'NDVI', 'Thermal']
      }
    }
  },
  {
    id: '13',
    name: 'Victoria Falls',
    status: 'completed',
    drone: 'DJI Inspire 2',
    latitude: -17.9243,
    longitude: 25.8572,
    startTime: '2024-02-13T06:00:00Z',
    createdAt: '2024-02-13T05:00:00Z',
    updatedAt: '2024-02-13T07:30:00Z',
    description: 'Survey of Victoria Falls and surrounding gorge',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -17.9243, lng: 25.8572 },
          { lat: -17.9193, lng: 25.8622 },
          { lat: -17.9293, lng: 25.8622 },
          { lat: -17.9293, lng: 25.8522 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -17.9243, lng: 25.8572, altitude: 50 },
          { lat: -17.9193, lng: 25.8622, altitude: 50 },
          { lat: -17.9293, lng: 25.8622, altitude: 50 },
          { lat: -17.9293, lng: 25.8522, altitude: 50 },
          { lat: -17.9243, lng: 25.8572, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '14',
    name: 'Northern Lights Survey',
    status: 'in-progress',
    drone: 'DJI Mavic 3',
    latitude: 69.6492,
    longitude: 18.9553,
    startTime: '2024-02-14T18:00:00Z',
    createdAt: '2024-02-14T17:00:00Z',
    updatedAt: '2024-02-14T19:30:00Z',
    description: 'Survey of Northern Lights activity and surrounding landscape',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 69.6492, lng: 18.9553 },
          { lat: 69.6542, lng: 18.9603 },
          { lat: 69.6442, lng: 18.9603 },
          { lat: 69.6442, lng: 18.9503 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 69.6492, lng: 18.9553, altitude: 60 },
          { lat: 69.6542, lng: 18.9603, altitude: 60 },
          { lat: 69.6442, lng: 18.9603, altitude: 60 },
          { lat: 69.6442, lng: 18.9503, altitude: 60 },
          { lat: 69.6492, lng: 18.9553, altitude: 60 }
        ],
        altitude: 60,
        overlap: 60
      },
      dataCollection: {
        frequency: 3,
        resolution: 'low',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '15',
    name: 'Amazon Rainforest',
    status: 'pending',
    drone: 'DJI Phantom 4',
    latitude: -3.4653,
    longitude: -62.2159,
    startTime: '2024-02-15T12:00:00Z',
    createdAt: '2024-02-15T11:00:00Z',
    description: 'Survey of Amazon Rainforest canopy and biodiversity',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -3.4653, lng: -62.2159 },
          { lat: -3.4603, lng: -62.2109 },
          { lat: -3.4703, lng: -62.2109 },
          { lat: -3.4703, lng: -62.2209 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -3.4653, lng: -62.2159, altitude: 50 },
          { lat: -3.4603, lng: -62.2109, altitude: 50 },
          { lat: -3.4703, lng: -62.2109, altitude: 50 },
          { lat: -3.4703, lng: -62.2209, altitude: 50 },
          { lat: -3.4653, lng: -62.2159, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'Multispectral']
      }
    }
  },
  {
    id: '16',
    name: 'Mount Everest Base Camp',
    status: 'in-progress',
    drone: 'DJI Mavic 3 Pro',
    latitude: 28.0026,
    longitude: 86.8527,
    startTime: '2024-02-14T19:00:00Z',
    createdAt: '2024-02-14T18:00:00Z',
    updatedAt: '2024-02-14T20:30:00Z',
    description: 'Survey of Mount Everest Base Camp and surrounding glaciers',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 28.0026, lng: 86.8527 },
          { lat: 28.0076, lng: 86.8577 },
          { lat: 27.9976, lng: 86.8577 },
          { lat: 27.9976, lng: 86.8477 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 28.0026, lng: 86.8527, altitude: 70 },
          { lat: 28.0076, lng: 86.8577, altitude: 70 },
          { lat: 27.9976, lng: 86.8577, altitude: 70 },
          { lat: 27.9976, lng: 86.8477, altitude: 70 },
          { lat: 28.0026, lng: 86.8527, altitude: 70 }
        ],
        altitude: 70,
        overlap: 80
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'Thermal']
      }
    }
  },
  {
    id: '17',
    name: 'Great Barrier Reef',
    status: 'completed',
    drone: 'DJI Inspire 2',
    latitude: -18.2871,
    longitude: 147.6992,
    startTime: '2024-02-13T05:00:00Z',
    createdAt: '2024-02-13T04:00:00Z',
    updatedAt: '2024-02-13T06:30:00Z',
    description: 'Survey of Great Barrier Reef coral formations and marine life',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -18.2871, lng: 147.6992 },
          { lat: -18.2821, lng: 147.7042 },
          { lat: -18.2921, lng: 147.7042 },
          { lat: -18.2921, lng: 147.6942 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -18.2871, lng: 147.6992, altitude: 40 },
          { lat: -18.2821, lng: 147.7042, altitude: 40 },
          { lat: -18.2921, lng: 147.7042, altitude: 40 },
          { lat: -18.2921, lng: 147.6942, altitude: 40 },
          { lat: -18.2871, lng: 147.6992, altitude: 40 }
        ],
        altitude: 40,
        overlap: 85
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'NDVI']
      }
    }
  },
  {
    id: '18',
    name: 'Dubai Palm Islands',
    status: 'in-progress',
    drone: 'DJI Mavic 3',
    latitude: 25.1124,
    longitude: 55.1390,
    startTime: '2024-02-14T20:00:00Z',
    createdAt: '2024-02-14T19:00:00Z',
    updatedAt: '2024-02-14T21:30:00Z',
    description: 'Survey of Dubai Palm Islands and surrounding development',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 25.1124, lng: 55.1390 },
          { lat: 25.1174, lng: 55.1440 },
          { lat: 25.1074, lng: 55.1440 },
          { lat: 25.1074, lng: 55.1340 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 25.1124, lng: 55.1390, altitude: 50 },
          { lat: 25.1174, lng: 55.1440, altitude: 50 },
          { lat: 25.1074, lng: 55.1440, altitude: 50 },
          { lat: 25.1074, lng: 55.1340, altitude: 50 },
          { lat: 25.1124, lng: 55.1390, altitude: 50 }
        ],
        altitude: 50,
        overlap: 70
      },
      dataCollection: {
        frequency: 2,
        resolution: 'medium',
        sensors: ['RGB', 'Thermal']
      }
    }
  },
  {
    id: '19',
    name: 'Venice Canals',
    status: 'pending',
    drone: 'DJI Phantom 4',
    latitude: 45.4408,
    longitude: 12.3155,
    startTime: '2024-02-15T13:00:00Z',
    createdAt: '2024-02-15T12:00:00Z',
    description: 'Survey of Venice canals and historic architecture',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: 45.4408, lng: 12.3155 },
          { lat: 45.4458, lng: 12.3205 },
          { lat: 45.4358, lng: 12.3205 },
          { lat: 45.4358, lng: 12.3105 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: 45.4408, lng: 12.3155, altitude: 55 },
          { lat: 45.4458, lng: 12.3205, altitude: 55 },
          { lat: 45.4358, lng: 12.3205, altitude: 55 },
          { lat: 45.4358, lng: 12.3105, altitude: 55 },
          { lat: 45.4408, lng: 12.3155, altitude: 55 }
        ],
        altitude: 55,
        overlap: 75
      },
      dataCollection: {
        frequency: 3,
        resolution: 'low',
        sensors: ['RGB']
      }
    }
  },
  {
    id: '20',
    name: 'Aurora Australis Survey',
    status: 'in-progress',
    drone: 'DJI Mavic 3 Pro',
    latitude: -77.8463,
    longitude: 166.6683,
    startTime: '2024-02-14T21:00:00Z',
    createdAt: '2024-02-14T20:00:00Z',
    updatedAt: '2024-02-14T22:30:00Z',
    description: 'Survey of Aurora Australis activity and Antarctic landscape',
    flightConfig: {
      surveyArea: {
        points: [
          { lat: -77.8463, lng: 166.6683 },
          { lat: -77.8413, lng: 166.6733 },
          { lat: -77.8513, lng: 166.6733 },
          { lat: -77.8513, lng: 166.6633 }
        ],
        type: 'polygon'
      },
      flightPath: {
        waypoints: [
          { lat: -77.8463, lng: 166.6683, altitude: 65 },
          { lat: -77.8413, lng: 166.6733, altitude: 65 },
          { lat: -77.8513, lng: 166.6733, altitude: 65 },
          { lat: -77.8513, lng: 166.6633, altitude: 65 },
          { lat: -77.8463, lng: 166.6683, altitude: 65 }
        ],
        altitude: 65,
        overlap: 65
      },
      dataCollection: {
        frequency: 1,
        resolution: 'high',
        sensors: ['RGB', 'Multispectral']
      }
    }
  }
]; 