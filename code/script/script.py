import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def scrape_scribd_document(url):
    # 1. Setup Chrome Options (Headless is often detected by Scribd, so we run with GUI)
    chrome_options = Options()
    # chrome_options.add_argument("--headless") # Keep commented out to avoid bot detection
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    
    # 2. Initialize Driver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        print(f"Opening: {url}")
        driver.get(url)

        # 3. Wait for the document to initially load
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME, "scribd_wrapper"))
        )
        print("Page loaded. Starting scroll sequence to trigger lazy loading...")

        # 4. Scroll Loop to Load All Pages
        # Scribd loads pages dynamically. We must scroll to the bottom.
        last_height = driver.execute_script("return document.body.scrollHeight")
        
        while True:
            # Scroll down by a fixed amount (simulating user reading)
            driver.execute_script("window.scrollBy(0, 1000);")
            
            # Wait for content to load
            time.sleep(1.5) 
            
            # Calculate new scroll height and compare with last scroll height
            new_height = driver.execute_script("return document.body.scrollHeight")
            
            # Check if we have reached the bottom or if a "Read More" button exists
            if new_height == last_height:
                # Try to find "Continue Reading" button if content is cut off
                try:
                    read_more_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Continue Reading')]")
                    read_more_btn.click()
                    time.sleep(2)
                except:
                    print("Reached end of scrollable content.")
                    break
            last_height = new_height

        print("Finished scrolling. Extracting text...")

        # 5. Extract Text
        # Scribd text is usually split into individual <span> or <div> elements inside a "text_layer"
        text_layers = driver.find_elements(By.CLASS_NAME, "text_layer")
        
        full_text = []
        
        for i, layer in enumerate(text_layers):
            # Extract text from the visible layer
            page_text = layer.text
            
            # Basic cleaning: Scribd often puts random newlines
            clean_text = page_text.replace("\n", " ")
            
            full_text.append(f"--- Page {i+1} ---\n{page_text}\n")

        # 6. Save and Print Result
        final_content = "\n".join(full_text)
        
        if not final_content.strip():
            print("\n[!] Warning: No text found. The document might be an image-only PDF or fully paywalled.")
        else:
            print("\n--- Extracted Text Preview ---")
            print(final_content[:500] + "...\n")
            
            with open("phenol_project.txt", "w", encoding="utf-8") as f:
                f.write(final_content)
            print(f"Successfully saved {len(full_text)} pages to 'phenol_project.txt'")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        driver.quit()

if __name__ == "__main__":
    target_url = "https://www.scribd.com/document/807490923/chemistry-project-1"
    scrape_scribd_document(target_url)