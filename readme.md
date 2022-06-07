#Link-Shortener API
*Created by Tobias Reuß aka. smarterToby*

**Current-Version: v1**

##Endpoints
###GET / (Homepage)
*Returns the homepage*

---
###GET `/api/v1/urls`
*Returns a list of all shortened URLs*

---
###GET `/api/v1/urls/:shortUrl`
*Returns all data of a shortened URL*

---
###GET `/api/v1/:shortUrl/clicks`
*Returns all clicks of a shortened URL*

---
###GET `/api/v1/urls/:shortUrl/full-url`
*Returns the full URL of a shortened URL*

---
###GET `/api/v1/urls/:fullUrl/short-url`
*Returns the shortened URL of a full URL*

---
###POST `/api/v1/createUrl`
*Creates a shortened URL*

---
###PUT `/api/v1/clicks/add/:shortUrl`
*Adds a click to a shortened URL*
