# assignment v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Portfolio](#portfolio)
	- [Create portfolio](#create-portfolio)
	- [Delete portfolio](#delete-portfolio)
	- [Retrieve portfolio](#retrieve-portfolio)
	- [Retrieve portfolios](#retrieve-portfolios)
	- [RetrieveReturnsOnPortfolio](#retrievereturnsonportfolio)
	- [Update portfolio](#update-portfolio)
	
- [Security](#security)
	- [Create security](#create-security)
	- [Delete security](#delete-security)
	- [Retrieve securities](#retrieve-securities)
	- [Retrieve security](#retrieve-security)
	- [Update security](#update-security)
	
- [SecurtiyMaster](#securtiymaster)
	- [Create securtiy master](#create-securtiy-master)
	- [Delete securtiy master](#delete-securtiy-master)
	- [Retrieve securtiy master](#retrieve-securtiy-master)
	- [Retrieve securtiy masters](#retrieve-securtiy-masters)
	- [Update securtiy master](#update-securtiy-master)
	
- [Trade](#trade)
	- [Create trade](#create-trade)
	- [Delete trade](#delete-trade)
	- [Retrieve trade](#retrieve-trade)
	- [Retrieve trades](#retrieve-trades)
	- [Update trade](#update-trade)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Portfolio

## Create portfolio



	POST /portfolio


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| user_id			| String			|  <p>user ID of the user</p>							|

## Delete portfolio



	DELETE /portfolio/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Retrieve portfolio



	GET /portfolio/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Retrieve portfolios



	GET /portfolio


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## RetrieveReturnsOnPortfolio



	GET /portfolio/returns/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Update portfolio



	PUT /portfolio/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| user_id			| String			|  <p>user ID of the user</p>							|

# Security

## Create security



	POST /security


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| ticker			| String			|  <p>ticker id from security master.</p>							|
| Portfolio_id			| String			|  <p>Portfolio id to which the security belong</p>							|

## Delete security



	DELETE /security/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Retrieve securities



	GET /security


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve security



	GET /security/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Update security



	PUT /security/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| ticker			| String			|  <p>ticker id from security master.</p>							|
| Portfolio_id			| String			|  <p>Portfolio id to which the security belong</p>							|

# SecurtiyMaster

## Create securtiy master



	POST /securtiy-masters


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| ticker			| String			|  <p>ticker of the security</p>							|

## Delete securtiy master



	DELETE /securtiy-masters/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| ticker			| String			|  <p>ticker of the security</p>							|

## Retrieve securtiy master



	GET /securtiy-masters/:id


## Retrieve securtiy masters



	GET /securtiy-masters


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update securtiy master



	PUT /securtiy-masters/:id


# Trade

## Create trade



	POST /trade


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| Portfolio_id			| String			|  <p>portfolio in which security is there.</p>							|
| Security_id			| String			|  <p>security in which trade happened.</p>							|
| Type			| String			|  <p>type of trade ['BUY','SELL'].</p>							|
| Quantity			| Number			|  <p>quantity no of trades.</p>							|
| Price			| Number			|  <p>price price of buy or sell.</p>							|

## Delete trade



	DELETE /trade/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Retrieve trade



	GET /trade/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|

## Retrieve trades



	GET /trade


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update trade



	PUT /trade/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access token.</p>							|
| Portfolio_id			| String			|  <p>portfolio in which security is there.</p>							|
| Security_id			| String			|  <p>security in which trade happened.</p>							|
| Type			| String			|  <p>type of trade ['BUY','SELL'].</p>							|
| Quantity			| Number			|  <p>quantity no of trades.</p>							|
| Price			| Number			|  <p>price price of buy or sell.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


