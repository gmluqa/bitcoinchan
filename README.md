# bitcoinchan

Bitcoinchan is a decentralized imageboard that requires users to hold at least 186000 bitcoins. After passing this signature check, users can post threads or reply to threads.

# Backend processes

1. User calls an endpoint at http://bitcoinchan.com/verify_holdings
2. They sign with their ETH wallet to verify they own minimum 186000 bitcoins from contract address 0x72e4f9f808c49a2a61de9c5896298920dc4eeea9 .
3. If they pass the check, they are granted a 1 hour bearer JWT and that is saved to sessionstorage.
4. They can now use the imageboard freely for 1 hour!.
5. If 1 hour has passed and the token is invalid, or if they fail the check, they cannot access the POST http://bitcoinchan.com/thread or POST http://bitcoinchan.com/reply
