import time
from random import choice

class SendSMS:
    def __init__(self, phone_number, proxy):
        self.phone_number = phone_number
        self.proxy = proxy

    def send_otp(self):
        print(f"Sending SMS to {self.phone_number} via {self.proxy}...")
        # Simulate success or failure
        return choice([True, False])

class SubmitSMS:
    def submit_otp(self, trigger_id, sms_code):
        print(f"Submitting SMS with trigger {trigger_id} and code {sms_code}...")
        # Simulate success or failure
        return choice([True, False])

def main():
    sms_sender = SendSMS("1234567890", "proxy_example")
    if sms_sender.send_otp():
        print("SMS sent successfully.")
    else:
        print("SMS failed.")

if __name__ == "__main__":
    while True:
        main()
        time.sleep(60)
