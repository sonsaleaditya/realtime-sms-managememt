# program1.py
import time
import logging

logging.basicConfig(filename='script.log', level=logging.INFO)
logging.info("Script started. Running indefinitely...")

try:
    while True:
        time.sleep(1)  # Keep the script running
except KeyboardInterrupt:
    logging.info("Script stopped.")
