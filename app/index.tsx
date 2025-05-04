import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');
const API_URL = ""; // Replace with your Render URL

export default function App() {
  const [detection, setDetection] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const speakDetection = (data) => {
    if (data && data.label) {
      const message = `Detected ${data.label} with ${Math.round(data.confidence * 100)} percent confidence.`;
      Speech.speak(message);
    }
  };

  const startInterval = () => {
    intervalRef.current = setInterval(async () => {
      try {
        const response = await axios.get(API_URL);
        const newDetection = response.data;
        setDetection(newDetection);
        speakDetection(newDetection);
      } catch (error) {
        console.error("Error fetching detection:", error);
      }
    }, 5000);
  };

  useEffect(() => {
    if (isRunning) {
      startInterval();
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleRunning = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      startInterval();
    }
    setIsRunning(!isRunning);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🔍 Real-Time Object Detection</Text>
      {detection && detection.label ? (
        <View style={styles.card}>
          <Text style={styles.label}>{detection.label}</Text>
          <Text style={styles.subtext}>Confidence: {Math.round(detection.confidence * 100)}%</Text>
          <View style={styles.detailsBox}>
            <Text style={styles.details}>📦 Box Coordinates</Text>
            <Text style={styles.details}>x: {detection.bounding_box.x}, y: {detection.bounding_box.y}</Text>
            <Text style={styles.details}>Size: {detection.bounding_box.width} x {detection.bounding_box.height}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noData}>No detection data available</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={toggleRunning}>
        <Text style={styles.buttonText}>{isRunning ? '⏸ Pause' : '▶️ Play'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    width: width,
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#e6ecf2',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 10,
  },
  label: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsBox: {
    backgroundColor: '#f4f7fa',
    padding: 16,
    borderRadius: 12,
  },
  details: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  noData: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007aff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});










// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Dimensions } from 'react-native';
// import axios from 'axios';
// import * as Speech from 'expo-speech';

// const { width, height } = Dimensions.get('window');
// const API_URL = "https://esp32-api-h6ld.onrender.com/data"; // Replace with your Render URL

// export default function App() {
//   const [detection, setDetection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDetection = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(API_URL);
//       setDetection(response.data);
//       speakDetection(response.data);
//     } catch (error) {
//       console.error("Error fetching detection:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const speakDetection = (data) => {
//     if (data && data.label) {
//       const message = `Detected ${data.label} with ${Math.round(data.confidence * 100)} percent confidence.`;
//       Speech.speak(message);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchDetection();
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     fetchDetection();
//   }, []);

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container} 
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <Text style={styles.header}>🔍 Object Detection</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : detection && detection.label ? (
//         <View style={styles.card}>
//           <Text style={styles.label}>{detection.label}</Text>
//           <Text style={styles.subtext}>Confidence: {Math.round(detection.confidence * 100)}%</Text>
//           <View style={styles.detailsBox}>
//             <Text style={styles.details}>📦 Box Coordinates</Text>
//             <Text style={styles.details}>x: {detection.bounding_box.x}, y: {detection.bounding_box.y}</Text>
//             <Text style={styles.details}>Size: {detection.bounding_box.width} x {detection.bounding_box.height}</Text>
//           </View>
//         </View>
//       ) : (
//         <Text style={styles.noData}>No detection data available</Text>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     minHeight: height,
//     width: width,
//     padding: 24,
//     paddingTop: 60,
//     alignItems: 'center',
//     backgroundColor: '#e6ecf2',
//     flexGrow: 1,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#222',
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     padding: 24,
//     borderRadius: 20,
//     shadowColor: '#000000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   label: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 8,
//   },
//   subtext: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//   },
//   detailsBox: {
//     backgroundColor: '#f4f7fa',
//     padding: 16,
//     borderRadius: 12,
//   },
//   details: {
//     fontSize: 15,
//     color: '#333',
//     marginBottom: 4,
//   },
//   noData: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#888',
//   }
// });




// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
// import axios from 'axios';

// const API_URL = "https://esp32-api-h6ld.onrender.com/data"; // Replace with your Render URL

// export default function App() {
//   const [detection, setDetection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDetection = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(API_URL);
//       setDetection(response.data);
//     } catch (error) {
//       console.error("Error fetching detection:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDetection();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchDetection();
//     setRefreshing(false);
//   };

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container} 
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <Text style={styles.title}>📷 Object Detection Result</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : detection && detection.label ? (
//         <View style={styles.card}>
//           <Text style={styles.label}>🧠 Detected: {detection.label}</Text>
//           <Text>Confidence: {Math.round(detection.confidence * 100)}%</Text>
//           <Text>Box: x:{detection.bounding_box.x}, y:{detection.bounding_box.y}</Text>
//           <Text>Size: {detection.bounding_box.width} x {detection.bounding_box.height}</Text>
//         </View>
//       ) : (
//         <Text style={styles.noData}>No detection data available</Text>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 80,
//     alignItems: 'center',
//     backgroundColor: '#f0f4f8',
//     flexGrow: 1
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//     fontWeight: 'bold'
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8
//   },
//   noData: {
//     fontStyle: 'italic',
//     color: '#555'
//   }
// });





// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit .</Text>
//     </View>
//   );
// }
