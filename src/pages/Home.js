import React, { useEffect, useState } from 'react';
import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));

    fetch('http://localhost:5000/api/booking/getAllBookings')
      .then((response) => response.json())
      .then((data) => {
        const allReviews = data.flatMap(booking => booking.reviews.map(review => ({
          user: review.user.username,
          review: review.review,
        })));
        setReviews(allReviews);
      })
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const pickupDate = event.target['pickup-date'].value;
    const pickupTime = event.target['pickup-time'].value;

    navigate(`/car-page?pickup-date=${pickupDate}&pickup-time=${pickupTime}`);
  };

  const handleBookNowClick = (carId) => {
    navigate(`/carBooking/${carId}`);
  };

  return (
    <div className="homepage">
      <section className="banner">
        <div className="overlay">
          <div className="banner-text">
            <h1>Discover Your Next Journey</h1>
            <p>Find the perfect car for your adventure. Easy, fast, and reliable.</p>
            <button onClick={() => navigate('/car')}>Explore Now</button>
          </div>
        </div>
        <img src='./home-bg-image.png' alt="Car by the beach" />
      </section>

      <section className="how-it-works">
        <h2>How happy car rental works</h2>
        <div className="steps">
          <div className="step-image">
            <img src="./car-rent.jpg" alt="Step 1" />
          </div>
          <div className='steps-container'>
            <div className="step">
              <div className="step-number">1</div>
              <div className='step-text'>
                <h3>Find the perfect car</h3>
                <p>Enter a location and date and browse thousands of cars shared by local hosts.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className='step-text'>
                <h3>Book your trip</h3>
                <p>Book on the Turo app or online, choose a protection plan, and say hi to your host!</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className='step-text'>
                <h3>Hit the road</h3>
                <p>Have the car delivered or pick it up from your host. Check in with the app, grab the keys, and hit the road!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Our Car Rental Service?</h2>
        <div className="features-container">
          <div className="feature">
            <img src="./time.svg" alt="Convenient Booking Icon" className="feature-icon" />
            <div className='feature-text'>
              <h3>Convenient Booking</h3>
              <p>Book your rental car online in just a few clicks.</p>
            </div>
          </div>
          <div className="feature">
            <img src="./car.svg" alt="Car Selection Icon" className="feature-icon" />
            <div className='feature-text'>
              <h3>Wide Car Selection</h3>
              <p>Choose from a variety of reliable and well-maintained vehicles.</p>
            </div>
          </div>
          <div className="feature">
            <img src="./wallet.svg" alt="Affordable Rates Icon" className="feature-icon" />
            <div className='feature-text'>
              <h3>Affordable Rates</h3>
              <p>Enjoy competitive prices and flexible rental options.</p>
            </div>
          </div>
          <div className="feature">
            <img src="./shield.svg" alt="Reliable Service Icon" className="feature-icon" />
            <div className='feature-text'>
              <h3>Reliable Service</h3>
              <p>Experience top-notch customer support and peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="car-models">
        <h2>Browse Our Car </h2>
        <div className="models-container">
          {cars.map((car) => (
            <div className="model" key={car._id}>
              <img src={`data:${car.imageId.contentType};base64,${car.imageId.imageBase64}`} alt={car.name} />
              <div className="car-details">
                <div className="car-name">
                  <div>
                    <h2 className="text-lg font-medium">{car.model}</h2>
                    <p className="text-gray-500">{car.make}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{car.year}</p>
                    <p className={`text-sm font-medium ${car.availability === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                      {car.availability}
                    </p>
                  </div>
                </div>

                <div className='price'>
                  <p> ${car.price} / hour</p>
                </div>

                <div className="car-button flex space-x-2">
                  <button 
                    className={`bg-black text-white py-2 px-4 rounded-md ${car.availability !== 'available' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
                    onClick={() => handleBookNowClick(car._id)}
                    disabled={car.availability !== 'available'}
                  >
                    Book Now
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="customer-testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          {reviews.map((review, index) => (
            <div className="testimonial" key={index}>
              <div className='testimonial-img'>
              <img src="./user.svg" alt="User icon" className="testimonial-icon" />

                </div>
                <div className='testimonial-text'>
                <h3>{review.user}</h3>
                <p>{review.review}</p>
                  </div>
       
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
