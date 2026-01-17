import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  nameHindi: string;
  address: string;
  distance: string;
  waitTime: number;
  rating: number;
  services: string[];
  open: boolean;
}

export function NearbyLocations() {
  const locations: Location[] = [
    {
      id: '1',
      name: 'AIIMS Delhi',
      nameHindi: 'अखिल भारतीय आयुर्विज्ञान संस्थान',
      address: 'Ansari Nagar, New Delhi - 110029',
      distance: '2.3 km',
      waitTime: 15,
      rating: 4.5,
      services: ['OPD', 'Emergency', 'Laboratory'],
      open: true,
    },
    {
      id: '2',
      name: 'Safdarjung Hospital',
      nameHindi: 'सफदरजंग अस्पताल',
      address: 'Ring Road, New Delhi - 110029',
      distance: '3.8 km',
      waitTime: 22,
      rating: 4.2,
      services: ['OPD', 'Emergency', 'Pharmacy'],
      open: true,
    },
    {
      id: '3',
      name: 'RTO Delhi North',
      nameHindi: 'आरटीओ दिल्ली उत्तर',
      address: 'Burari, Delhi - 110084',
      distance: '5.1 km',
      waitTime: 35,
      rating: 3.8,
      services: ['License', 'RC Transfer', 'Renewal'],
      open: false,
    },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Nearby Locations</h2>
          <p className="text-xs text-gray-400">Find services near you</p>
        </div>
      </div>

      <div className="space-y-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{location.name}</h3>
                  {location.open ? (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                      Open
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      Closed
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{location.nameHindi}</p>
                <p className="text-sm text-gray-400">{location.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">{location.distance} away</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">~{location.waitTime} min wait</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white font-medium">{location.rating}</span>
              <span className="text-xs text-gray-500 ml-1">(2,341 reviews)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {location.services.map((service, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>

            <button className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
