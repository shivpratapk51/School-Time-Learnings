import { instagramGetUrl } from "instagram-url-direct";
import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url'; // Import specific function to avoid conflict

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function downloadReel(instagramLink: string): Promise<void> {
    // Generate a unique file name using timestamp
    const fileName = `reel_${Date.now()}`; 

    try {
        console.log("Fetching media link...");

        // Fetch the direct video URL
        const links = await instagramGetUrl(instagramLink);

        // Check if url_list exists and has items
        if (links.url_list && links.url_list.length > 0) {
            const videoUrl: string = links.url_list[0]!;
            const outputPath = path.resolve(__dirname, `${fileName}.mp4`);

            console.log("Starting download...");

            // Use Axios to download the video stream
            const response = await axios({
                method: 'GET',
                url: videoUrl,
                responseType: 'stream'
            });

            // Wrap the stream writing in a Promise so we can await it
            await new Promise((resolve, reject) => {
                const writer = fs.createWriteStream(outputPath);
                
                response.data.pipe(writer);

                writer.on('finish', () => {
                    console.log(`Successfully downloaded: ${outputPath}`);
                    resolve(true);
                });

                writer.on('error', (err: Error) => {
                    console.error("Error writing file:", err);
                    reject(err);
                });
            });

        } else {
            console.error("No video found at that URL (Private account or Invalid Link).");
        }
    } catch (error) {
        console.error("An error occurred:", (error as Error).message);
    }
}