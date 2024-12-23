APIS:

1) AUTH:
BASE URL: domain/api

1.1) URL: /signup 
METHOD: post
BODY: { email, password, name, timezone: number(...,-2.5(for -2hour30minute), -2, -1, 0, 1, 2, 3.75(for +3hour45minute), ...), isSkorboardUser: true/false }
RESPONSE: { message: "...", result: true }
DESCRIPTION: will send the OTP to the email address for email verification

1.2) URL: /login 
METHOD: post
BODY: { email, password }
RESPONSE: { message: "...", token: "..." }
DESCRIPTION: will send the message and token to use that token for furthur use of APIS and socket

1.3) URL: /logout 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "..." }
DESCRIPTION: will send the message

1.4) URL: /verify/:otp
METHOD: patch
RESPONSE: { message: "...", result: true }
DESCRIPTION: will send the message and result true if verified otherwise will send error message

1.5) URL: /resetPassword
METHOD: post
BODY: { email }
RESPONSE: { message: "...", result: true }
DESCRIPTION: will send the OTP to the email address for password change

1.6) URL: /updatePassword/:otp
METHOD: patch
BODY: { password }
RESPONSE: { message: "...", result: true }
DESCRIPTION: will send the message and result : true


2) GAME:
BASE URL: domain/api/game

2.1) URL: /nhl/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.2) URL: /mlb/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.3) URL: /nfl/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.4) URL: /ncaaf/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.5) URL: /nba/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.6) URL: /cbk/:date => date : "YYYYMMDD" 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: "..." }

2.7) URL: /nhlById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.8) URL: /mlbById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.9) URL: /nflById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.10) URL: /ncaafById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.11) URL: /nbaById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.12) URL: /cbkById/:id 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: {object} }

2.13) URL: /teams/:league 
league should be "mlb", "nhl", "nfl", "ncaaf", "nba" or "cbk"
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.14) URL: /standings/:league 
league should be "mlb", "nhl", "nfl", "ncaaf", "nba" or "cbk"
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

2.15) URL: /news/:league
league should be "mlb", "nhl", "nfl", "ncaaf", "nba" or "cbk"
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: [] }

3) LOG:
BASE URL: domain/api/logs

3.1) URL: /
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { ...logData } }

4) SQUARES GAME:
BASE URL: domain/api/squares

4.1) URL: /users/:id/:creationDate
METHOD: get
RESPONSE: { message: "...", result: [] }

4.2) URL: /invites
METHOD: post
BODY: { gameCreatorName, leagueName, gameId, generatedId, inviteEmails }
RESPONSE: { message: "...", result: true }

5) USER:
BASE URL: domain/api/user

5.1) URL: /detail 
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { ...data } }

5.2) URL: /username/:username
DESCRIPTION: will check is username available
METHOD: get
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: true/false }

5.3) URL: /theme
DESCRIPTION: will update the favourite theme for each league
METHOD: patch
BODY: { sportName, theme }
sportName should be "mlbTheme", "nhlTheme", "nflTheme", "ncaafTheme", "nbaTheme" or "cbkTheme"
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.4) URL: /border
DESCRIPTION: will update the border of the app for a user
METHOD: patch
BODY: { border }
border should be 0(none), 1(top one side), 2(min all sides) or 3(max all sides)
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.5) URL: /team
DESCRIPTION: will update the favorite team for each league
METHOD: patch
BODY: { sportName, team }
sportName should be "mlbTeam", "nhlTeam", "nflTeam", "ncaafConferenceTeam" or "nbaTeam"
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.6) URL: /goalHorn
DESCRIPTION: will update the goal horn for the games of users
METHOD: patch
BODY: { goalHorn: [] }
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.7) URL: /delayTime
DESCRIPTION: will update the user delay time for auto mode functionality
METHOD: patch
BODY: { delayTime }
delayTime should be number which will assume in a seconds
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.8) URL: /username
DESCRIPTION: will update the username
METHOD: patch
BODY: { username }
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }

5.9) URL: /timezone
DESCRIPTION: will update the timezone of the user
METHOD: patch
BODY: { timezone }
timezone should be number(...,-2.5(for -2hour30minute), -2, -1, 0, 1, 2, 3.75(for +3hour45minute), ...)
HEADERS: "bearer ${token}" in authorization
RESPONSE: { message: "...", result: { updated user data } }


SOCKETS:

1.1) Connect sockets send a bearer token too which we get from login api
extraHeaders: { authorization: `bearer ${token}`}

1.2) Connect NHL:
socket.emit("connectNhl", null)
  
1.3) Connect MLB:
socket.emit("connectMlb", null)
  
1.4) Connect NFL:
socket.emit("connectNfl", null)
  
1.5) Connect NCAAF:
socket.emit("connectNcaaf", null)
  
1.6) Connect NBA:
socket.emit("connectNba", null)
  
1.7) Connect CBK:
socket.emit("connectCbk", null)
  
1.8) Disconnect or Remove NHL:
socket.emit("removeNhl", null)
  
1.9) Disconnect or Remove MLB:
socket.emit("removeMlb", null)
  
1.10) Disconnect or Remove NFL:
socket.emit("removeNfl", null)
  
1.11) Disconnect or Remove NCAAF:
socket.emit("removeNcaaf", null)
  
1.12) Disconnect or Remove NBA:
socket.emit("removeNba", null)
  
1.13) Disconnect or Remove CBK:
socket.emit("removeCbk", null)

1.14) Event NHL:
socket.on("nhlData", async (message) => {
    ...
})

1.15) Event MLB:
socket.on("mlbData", async (message) => {
    ...
})

1.16) Event NFL:
socket.on("nflData", async (message) => {
    ...
})

1.17) Event NCAAF:
socket.on("ncaafData", async (message) => {
    ...
})

1.18) Event NBA:
socket.on("nbaData", async (message) => {
    ...
})

1.19) Event CBK:
socket.on("cbkData", async (message) => {
    ...
})

1.20) Event Disconnect:
socket.on("disconnect", () => {
    socket.disconnect()
})

1.21) CREATE SQUARES GAME
"create-squares-game"

1.22) JOIN SQUARES GAME
"join-squares-game"

1.23) RANDOMIZE SQUARES GAME
"randomize-squares-game"

1.24) FINALIZE SQUARES GAME
"finalize-squares-game"

1.25) LOCK SQUARES GAME
"lock-squares-game"

1.26) LEAVE SQUARES GAME
"leave-squares-game"

1.27) CANCEL SQUARES GAME
"cancel-squares-game"
