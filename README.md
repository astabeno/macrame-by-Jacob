# Next.js Macrame Auction Website

This is a repository for a Next.js website that is designed for auctioning macrame items. It utilizes Firebase for authentication, real-time database for storing auction data, and Firebase storage for image storage. The website includes a portal for uploading pictures and creating auction items, referred to as "pieces". 

## Features

- Authentication: Users can sign up and log in to the website using Firebase authentication. 
- Real-time Database: Auction data, including piece information such as title, description, price, and auction end time, is stored in Firebase real-time database.
- Image Storage: Images for the auction pieces are stored in Firebase storage for efficient retrieval and management.
- Admin Portal: The website includes an admin portal for authenticated users to upload images and create auction items.
- Bidding System: Users can place bids on auction items, and the highest bidder wins when the auction ends.
- Timer: A countdown timer is displayed for each auction item, showing the time remaining until the auction ends.
- Responsive Design: The website is designed to be responsive and mobile-friendly, providing a seamless experience across different devices.

## Technologies Used

- Next.js: A popular React framework for building server-rendered React applications.
- Firebase: A comprehensive suite of cloud-based tools and services for building web and mobile applications, including Firebase authentication, real-time database, and storage.
- React: A popular JavaScript library for building user interfaces.
- Tailwind CSS: A highly customizable CSS framework for building modern and responsive user interfaces with pre-designed utility classes for styling.


## Setup Instructions

To run the website locally, follow these steps:

1. Clone the repository to your local machine using `git clone`.
2. Install the dependencies using `npm install` or `yarn install`.
3. Create a Firebase project and enable Firebase authentication, real-time database, and storage.
4. Create a `.env` file in the root of the project and provide the necessary environment variables, such as Firebase configuration settings.
5. Run the development server using `npm run dev` or `yarn dev`.
6. Open your web browser and navigate to `http://localhost:3000` to access the website locally.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request. Please make sure to follow the existing coding conventions and include appropriate tests for any new functionality.

## License

This repository is licensed under the [MIT License](LICENSE), which means that you are free to use, modify, and distribute the code as long as you provide attribution and include the same license in your derivative work. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or need further assistance, please feel free to contact the project owner or raise an issue in the repository. We appreciate your feedback and contributions!
