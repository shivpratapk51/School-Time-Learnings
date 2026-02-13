import cv2
import pyaudio
import threading
import time

class AVSyncedStream:
    def __init__(self):
        self.video_cap = cv2.VideoCapture(0)
        self.audio = pyaudio.PyAudio()
        self.running = True
        
        # audio config
        self.chunk = 1024
        self.FORMAT = pyaudio.paInt16
        self.CHANNELS = 1
        self.RATE = 44100
        
        self.audio_stream = self.audio.open(
            format=self.FORMAT,
            channels=self.CHANNELS,
            rate=self.RATE,
            input=True,
            frames_per_buffer=self.chunk
        )
    
    def start_audio(self):
        '''Thread target for audio capture'''
        i = 1
        while self.running:
            try:
                data = self.audio_stream.read(self.chunk, exception_on_overflow = False)
            except Exception as e:
                print(i)
                print(f"Audio Error {e}")
                i+=1
                
                
    def start_video(self):
        "Main loop for video capture and display"
        audio_thread = threading.Thread(target=self.start_audio)
        audio_thread.start()
        print("Streaming.... Press 'q' to quit.")
        while True:
            ret, frame = self.video_cap.read()
            if not ret:
                break
            
            cv2.imshow('Video Stream (Audio running in background)', frame)
            
            if cv2.waitKey(1) == ord('q'):
                self.running = False
                break
            
        self.video_cap.release()
        cv2.destroyAllWindows()
        self.audio_stream.stop_stream()
        self.audio_stream.close()
        self.audio.terminate()
        audio_thread.join()
        
        
if __name__ == "__main__":
    streamer = AVSyncedStream()
    streamer.start_video()
            














# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Can not open")
#     exit()
    
# while True:
#     ret,frame = cap.read()
#     if not ret:
#         print("Can't receive frame (stream end?). Exiting ...")
#         break
#     print(frame)
#     cv2.imshow('Local Video Stream', frame)
    
#     if cv2.waitKey(1) == ord('q'):
#         break
    
# cap.release()
# cv2.destroyAllWindows()