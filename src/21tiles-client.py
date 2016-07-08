# import from the 21 Developer Library
from two1.wallet import Wallet
from two1.bitrequests import BitTransferRequests

# set up bitrequest client for BitTransfer requests
wallet = Wallet()
requests = BitTransferRequests(wallet)

# server address
server_url = 'http://localhost:5000/'


def buy_translation():
    # Ask user to input text in english
    print("Welcome to English-to-Chinese Translation.\n")
    inp_text = input("Enter the English text that you would like translated into Chinese:\n")

    # Send request to server with user input text and user's wallet address for payment
    sel_url = server_url+'translate?text={0}&payout_address={1}'
    response = requests.get(url=sel_url.format(inp_text, wallet.get_payout_address()))

    # Print the translated text out to the terminal
    print("The following is the translation of the text you input.\n")
    print(response.text)

if __name__ == '__main__':
    buy_translation()