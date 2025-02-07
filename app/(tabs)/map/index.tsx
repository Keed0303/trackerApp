import React, { useEffect, useState } from "react";
import {
	StatusBar,
	StatusBarStyle,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState<  Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const apiKey = "5ee76e07-22f8-4b65-a1ec-9eb1fbdafaee";
  const mapbox = 'pk.eyJ1IjoibW9uYWdwYWxhIiwiYSI6ImNsam05c3pjYzB4b3gzaG80cnQ1enZuazYifQ.XOk5I-h3sKM-E639D4I0DQ';
	const mapHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OpenLayers Map</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.4.0/ol.css">
        <style>
            html, body, #map {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
            }
                /* Resize the "i" button */
          .ol-attribution button {
              width: 25px !important;
              height: 25px !important;
              font-size: 18px !important;
              color: white !important; /* Change text color */
              border: none !important;
              border-radius: 50% !important; /* Circular button */
          }
        </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://cdn.jsdelivr.net/npm/ol@v10.4.0/dist/ol.js"></script>
      <script>
        const map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.StadiaMaps({
                layer: 'alidade_smooth_dark',
                retina: true,
                 apiKey: '${apiKey}',
              }),
            }),
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat(['${location?.coords.longitude}', '${location?.coords.latitude}']),
            zoom: 18
          }),
        });
      </script>
    </body>
    </html>
  `;



  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status != 'granted') {
        setErrorMsg('Permission to access location is denied');
        return;
      }

      let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
      console.log('location', location);
      
      setLocation(location);
    }

    getCurrentLocation();
  }, [])

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView style={styles.container}>
					<StatusBar
						animated={true}
						backgroundColor='white'
						barStyle='dark-content'
						showHideTransition='none'
						hidden={false}
					/>
          
          <View style={styles.cardContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>View Routes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonContainer, styles.startButton]}>
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity> 
            </View>
					</View>
					<View style={styles.mapContainer}>
						<WebView
							style={styles.webview}
							originWhitelist={["*"]}
							source={{ html: mapHtml }}
						/>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ECF0F1",
	},
	toolbarContainer: {
		height: 56,
		justifyContent: "center",
		alignItems: "center",
	},
	mapContainer: {
		flex: 1,
		position: "relative",
	},
	webview: {
		flex: 1,
		zIndex: 1,
	},
	cardContainer: {
		position: "absolute", // Absolute positioning to overlay on top
    bottom: "0%",
    left: '50%',
    transform: [{ translateX: "-50%"}, { translateY: "50%"}], // Translate to center horizontally
		zIndex: 999, // Ensure the card container is on top of WebView
		backgroundColor: "white", // Background to make the card visible
    padding: 10,
    marginBottom: 75,
		borderRadius: 8, // Optional: to make it rounded
    width: "95%",
    height: "auto"    
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  buttonContainer: {
    width: "45%",
  },
  startButton: {
    backgroundColor: '#321df0',
    height: 44,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
