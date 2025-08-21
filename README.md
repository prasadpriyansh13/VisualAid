
Analysing Visual Data, and converting them to Auditory medium, in order to help individuals with impaired vision to assess their surroundings in a better way.

As part of my final year electronics engineering project, I developed VisionAid — an edge-based, real-time object detection system aimed at improving the mobility and independence of visually impaired individuals. This wearable solution uses the ESP32-CAM microcontroller, a custom-trained object detection model from Edge Impulse, and a React Native mobile application to detect everyday objects and deliver audio alerts through Bluetooth earphones.

VisionAid captures video frames using an ESP32-CAM and runs a lightweight object detection model directly on the device (no internet required). Once an object is detected, the system sends structured JSON data via UDP to a paired smartphone app built in React Native. The app parses the detection data and converts it into speech using a Text-to-Speech (TTS) engine. The user receives this feedback instantly through Bluetooth earphones.

The system was trained using a mix of open datasets and custom-labeled images to recognize daily surroundings.

Average inference time on the ESP32-CAM: ~250 ms, with ~85% detection accuracy in good lighting conditions.

Testing & Results
The system was tested in both indoor and outdoor scenarios. It could reliably detect small personal objects placed on a table or floor and alert the user through clear audio feedback. 

Technologies Used
Hardware: ESP32-CAM, Bluetooth earphones
ML Tools: Edge Impulse, TensorFlow Lite Micro
Software: Arduino IDE, React Native (Expo)
Languages: C++, JavaScript, TypeScript
<br>
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/cf269315-4eb6-4368-b144-34bfb2d2067b" /><br>
