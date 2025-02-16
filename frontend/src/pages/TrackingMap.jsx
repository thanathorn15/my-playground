import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import L from "leaflet";

// 📍 ไอคอนรถยนต์ 🚗
const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995504.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// 🔵 ไอคอนจุดเริ่มต้น (หมุดสีน้ำเงิน)
const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", // หมุดสีแดง
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// 🔴 ไอคอนจุดปลายทาง (หมุดสีแดง)
const endIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // หมุดสีฟ้า
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});


const TrackingMap = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // ✅ จุดเริ่มต้นและปลายทาง
  const startLocation = [13.7563, 100.5018]; // 📍 กรุงเทพมหานคร
  const endLocation = [13.7416, 100.5284]; // 📍 อโศก

  const [routePath, setRoutePath] = useState([]); // 🔵 เก็บเส้นทางจริง
  const [markerPosition, setMarkerPosition] = useState(startLocation); // 🚗 ตำแหน่งรถ
  // const [currentIndex, setCurrentIndex] = useState(0); // 🏁 ตำแหน่งปัจจุบัน

  // ✅ ดึงเส้นทางจาก OpenStreetMap API
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${startLocation[1]},${startLocation[0]};${endLocation[1]},${endLocation[0]}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes.length > 0) {
          setRoutePath(data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]));
          setMarkerPosition(startLocation);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, []);

  // ✅ เคลื่อนที่ Marker ตามเส้นทาง
  useEffect(() => {
    if (routePath.length === 0) return;

    let animationFrame;
    let currentPoint = 0;

    const moveMarker = () => {
      if (currentPoint >= routePath.length - 1) {
        currentPoint = 0; // วนลูปเส้นทางใหม่
      }

      const nextPoint = currentPoint + 1;
      const start = routePath[currentPoint];
      const end = routePath[nextPoint];
      const duration = 1500; // ⏳ เคลื่อนที่ 1.5 วินาที
      const startTime = performance.now();

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;
        setMarkerPosition([lat, lng]);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          currentPoint = nextPoint;
          moveMarker();
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    moveMarker();

    return () => cancelAnimationFrame(animationFrame);
  }, [routePath]);

  return (
    <div className={`w-screen h-screen p-6 transition-colors duration-300 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold text-center mb-4">
        🗺 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Real-time Tracking</span>
      </h1>

      <div className="w-full max-w-4xl h-[500px] mx-auto shadow-lg rounded-lg overflow-hidden">
        <MapContainer
          center={startLocation}
          zoom={14}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          {/* 🗺 แผนที่ Dark Mode & Light Mode */}
          <TileLayer
            url={darkMode 
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* 🔵 วาดเส้นทางจริง */}
          <Polyline positions={routePath} color="blue" weight={4} />

          {/* 🏁 Marker จุดเริ่มต้น */}
          <Marker position={startLocation} icon={startIcon}>
            <Popup>🏁 Start Point</Popup>
          </Marker>

          {/* 🎯 Marker จุดปลายทาง */}
          <Marker position={endLocation} icon={endIcon}>
            <Popup>🎯 Destination</Popup>
          </Marker>

          {/* 🚗 Marker ที่เคลื่อนที่ตามเส้นทาง */}
          <Marker position={markerPosition} icon={carIcon}>
            <Popup>
              🚗 Vehicle is moving <br /> Lat: {markerPosition[0].toFixed(5)}, Lng: {markerPosition[1].toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingMap;
