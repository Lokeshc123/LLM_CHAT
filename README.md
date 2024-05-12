To run Clone into this repo and run yarn install or npm install in project dir 
After than go to client folder and run yarn install or npm install

To run backend in project repo Run npm run dev
to start frontend run yarn start or npm start

Api routes  ---- description  ---- Input / Expected Output

User Routes 


1. Register
   - Route: `/register`
   - Method: POST
   - Description: Registers a new user.
   - Input: JSON object with `name`, `email`, and `password`.
   - Output: If successful, returns a token for the newly registered user; otherwise, returns an error message.

2. Login
   - Route: `/login`
   - Method: POST
   - Description: Logs in a user.
   - Input: JSON object with `email` and `password`.
   - Output: If successful, returns a token for the logged-in user; otherwise, returns an error message.

3. Get Users
   - Route: `/getUsers`
   - Method: GET
   - Description: Retrieves all users except the logged-in user.
   - Input: Query parameter `id` for the logged-in user.
   - Output: Returns an array of user objects.

4. Get User Details
   - Route: `/userDetails/:id`
   - Method: GET
   - Description: Retrieves details of a specific user by ID.
   - Input: User ID as a route parameter.
   - Output: Returns the user object excluding the password.

5. Send Friend Request
   - Route: `/sendFriendRequest`
   - Method: POST
   - Description: Sends a friend request from one user to another.
   - Input: JSON object with `id` (sender's ID) and `friendId` (receiver's ID).
   - Output: Returns the updated sender and receiver user objects.

6. Get Friend Requests
   - Route: `/getFriendRequests/:id`
   - Method: GET
   - Description: Retrieves all friend requests received by a user.
   - Input: User ID as a route parameter.
   - Output: Returns an array of user objects who sent friend requests.

7. Accept Friend Request
   - Route: `/acceptFriendRequest`
   - Method: POST
   - Description: Accepts a friend request from another user.
   - Input: JSON object with `id` (receiver's ID) and `friendId` (sender's ID).
   - Output: Returns success message along with updated sender and receiver user objects.

8. Reject Friend Request
   - Route: `/rejectFriendRequest`
   - Method: POST
   - Description: Rejects a friend request from another user.
   - Input: JSON object with `id` (receiver's ID) and `friendId` (sender's ID).
   - Output: Returns success message along with updated sender and receiver user objects.

9. Get Friends
   - Route: `/getFriends/:id`
   - Method: GET
   - Description: Retrieves all friends of a user.
   - Input: User ID as a route parameter.
   - Output: Returns an array of user objects who are friends.

10. Remove Friend
    - Route: `/removeFriend`
    - Method: POST
    - Description: Removes a friend connection between two users.
    - Input: JSON object with `id` (user's ID) and `friendId` (friend's ID).
    - Output: Returns success message along with updated user and friend objects.

11. Update Status
    - Route: `/updateStatus`
    - Method: POST
    - Description: Updates the status of a user.
    - Input: JSON object with `id` (user's ID) and `status`.
    - Output: Returns the updated user object.
Message Routes


1. Send Message
   - Route: `/sendmessage`
   - Method: POST
   - Description: Sends a message from one user to another.
   - Input: JSON object with `senderId`, `receiverId`, and `message`.
   - Output: If successful, returns a success message along with the sent message object.

2. Get Conversation
   - Route: `/getmessages/:senderId/:receiverId`
   - Method: GET
   - Description: Retrieves the conversation (messages) between two users.
   - Input: Sender ID and Receiver ID as route parameters.
   - Output: Returns an array of message objects representing the conversation.

3. AI Message
   - Route: `/ai-msg`
   - Method: GET
   - Description: Generates a professional message using AI when the user is unavailable.
   - Input: No input required.
   - Output: Returns a JSON object with a generated professional message.

Necessary Enviromenet variable conditions make .env file in /server/config
have mongoUrl , port , jwt_Secret in it
