# InLink

<img src="https://inlink-seeds.s3.amazonaws.com/InLink_full_logo.png"
     alt="InLink Logo by Daniel Wu" width="320" height="auto">

Welcome to my LinkedIn clone! I used Ruby on Rails to build a RESTful API server for data transfer between a normalized 
PostgreSQL database and the frontend. It is a single-page application built with React for DOM manipulation and uses 
Redux for application state management. Images are stored in an AWS S3 bucket and retrieved with ActiveStorage. 
Here's the [live site!](https://inlink.herokuapp.com)

# Dependencies

* Ruby, Rails, React, Redux, Webpack, Babel
* Gems: jquery-rails, aws-sdk-s3, faker, down

# Features

### Update profile with an avatar, background image, and personal information

<img src="/app/assets/images/README_images/user_details.PNG" alt="User Details" width="500" height="auto"/>

### Update education & experience information

<img src="/app/assets/images/README_images/user_exp_edu.PNG" alt="Experience & Education Info" width="500" height="auto"/>

### Make and edit posts to InLink

<img src="/app/assets/images/README_images/new_post.gif" alt="Post Demo" width="500" height="auto"/>

### Comment and like on other user's posts

<img src="/app/assets/images/README_images/post_comments.PNG" alt="Comment Demo" width="500" height="auto"/>

### Search and connect with other users

<img src="/app/assets/images/README_images/search_connect.gif" alt="Search & Connect Demo" width="500" height="auto"/>

### View their own list of linked users

<img src="/app/assets/images/README_images/invitations.PNG" alt="Invitations Demo" width="auto" height="200"/>
<img src="/app/assets/images/README_images/connections.PNG" alt="Connections Demo" width="auto" height="200"/>

# Future Direction

* Users may: 
  * Receive notifications from linked user's activity
  * Search for other users based on name, education, or experience
  * Message other users
