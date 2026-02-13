# ONtheGO - Real-time Communication Platform

A secure, peer-to-peer real-time communication platform built with Next.js and WebRTC. Connect with others through video calls, voice calls, and text chat using a simple shareable room code.

## Features

- 🎥 **Video Calls** - High-quality peer-to-peer video calling
- 🎤 **Voice Calls** - Audio-only communication option
- 💬 **Real-time Chat** - Instant messaging through WebRTC data channels
- 🔒 **Peer-to-Peer** - Direct connections for enhanced privacy
- 🔗 **Simple Sharing** - Connect using easy-to-share room codes
- 🎛️ **Media Controls** - Mute/unmute audio and toggle video during calls

## Tech Stack

### Frontend (Web)
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Socket.IO Client** - Real-time signaling
- **WebRTC** - Peer-to-peer connections

### Backend (Server)
- **Node.js** - Runtime environment
- **Express** - Web server framework
- **Socket.IO** - WebSocket signaling server
- **TypeScript** - Type-safe development

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client A  │◄───────►│   Signaling  │◄───────►│   Client B  │
│   (Browser) │         │    Server    │         │   (Browser) │
└─────────────┘         └──────────────┘         └─────────────┘
       │                                                 │
       │                                                 │
       └─────────────► WebRTC P2P Connection ◄──────────┘
                    (Video, Audio, Data Channel)
```

1. **Signaling Server**: Facilitates initial connection setup and ICE candidate exchange
2. **WebRTC Peer Connection**: Direct peer-to-peer connection for media and data
3. **Data Channel**: Real-time text chat over WebRTC
4. **Media Streams**: Audio and video tracks transmitted directly between peers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ONtheGO
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install web dependencies**
   ```bash
   cd ../web
   npm install
   ```

### Running the Application

You need to run both the signaling server and the web application:

1. **Start the signaling server** (in the `server` directory)
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3001`

2. **Start the web application** (in the `web` directory)
   ```bash
   npm run dev
   ```
   The web app will start on `http://localhost:3000`

3. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Create a new room or join an existing one with a room code
   - Share the room code with others to connect

## Usage

### Creating a Room
1. Click "Create New Room" on the landing page
2. A unique room code will be generated
3. Share this code with the person you want to connect with

### Joining a Room
1. Enter the room code in the input field
2. Click "Join Room"
3. Wait for the other person to join

### Starting a Call
- Click the **phone icon** for an audio-only call
- Click the **video icon** for a video call
- The other person will automatically receive the call

### During a Call
- Click the **microphone icon** to mute/unmute your audio
- Click the **video icon** to turn your camera on/off
- Click the **red phone icon** to end the call
- Use the chat panel to send text messages

## Environment Variables

### Server
Create a `.env` file in the `server` directory:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### Web
The web application uses the default Next.js configuration. To change the signaling server URL, update the connection URL in `web/src/app/room/[roomId]/page.tsx`:

```typescript
connect("http://localhost:3001");
```

## Project Structure

```
ONtheGO/
├── server/                 # Signaling server
│   ├── src/
│   │   └── index.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
│
└── web/                   # Next.js web application
    ├── src/
    │   ├── app/           # Next.js App Router
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── room/[roomId]/page.tsx
    │   ├── components/    # React components
    │   │   ├── ChatInterface.tsx
    │   │   ├── VideoCall.tsx
    │   │   └── LandingPage.tsx
    │   ├── hooks/         # Custom React hooks
    │   │   └── useWebRTC.ts
    │   └── store/         # Zustand state management
    │       ├── useChatStore.ts
    │       └── useConnectionStore.ts
    ├── package.json
    └── tsconfig.json
```

## Key Components

### useWebRTC Hook
Manages WebRTC peer connections, media streams, and data channels:
- Handles offer/answer exchange
- Manages ICE candidates
- Controls media streams (audio/video)
- Provides data channel for chat

### ChatInterface
Real-time messaging component using WebRTC data channels:
- Displays message history
- Sends/receives messages
- Auto-scrolls to latest messages

### VideoCall
Video/audio call interface:
- Displays local and remote video streams
- Media controls (mute, video toggle, end call)
- Picture-in-picture local video

## Troubleshooting

### Connection Issues
- Ensure both the server and web app are running
- Check that the signaling server URL is correct
- Verify firewall settings allow WebRTC connections

### Media Permissions
- Grant camera and microphone permissions when prompted
- Check browser settings if permissions are blocked

### No Video/Audio
- Ensure your camera and microphone are not being used by another application
- Try refreshing the page and granting permissions again

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

WebRTC features require a modern browser with full WebRTC support.

## Future Enhancements

- [ ] File sharing via data channels
- [ ] Screen sharing
- [ ] Chat message persistence
- [ ] Multiple participants support
- [ ] End-to-end encryption
- [ ] Recording capabilities
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- WebRTC implementation using native browser APIs
- Signaling with [Socket.IO](https://socket.io/)
