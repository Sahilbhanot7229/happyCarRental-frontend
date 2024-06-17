import React from 'react';
import '../style/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="banner">
        <img src='./car-banner.jpeg' alt="Car by the beach" />
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
        <h2>Browse Our Car Models</h2>
        <div className="models-container">
          <div className="model">
            <img src="./corolla.png" alt="Toyota Corolla" />
            <h3>Toyota Corolla</h3>
            <p>Compact sedan with great fuel efficiency.</p>
            <p>$50/day</p>
            <button>Rent Now</button>
          </div>
          <div className="model">
            <img src="./civic.png" alt="Honda Civic" />
            <h3>Honda Civic</h3>
            <p>Reliable and spacious midsize sedan.</p>
            <p>$60/day</p>
            <button>Rent Now</button>
          </div>
          <div className="model">
            <img src="./mustang.png" alt="Ford Mustang" />
            <h3>Ford Mustang</h3>
            <p>Powerful and stylish sports car.</p>
            <p>$80/day</p>
            <button>Rent Now</button>
          </div>
        </div>
      </section>

      <section className="customer-testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <img src="./user.svg" alt="User icon" className="testimonial-icon" />

            <h3>Sahil</h3>
            <p>San Francisco, CA</p>
            <p>"I had a great experience renting a car from this service. The process was easy, the car was in excellent condition, and the customer service was top-notch."</p>
          </div>
          <div className="testimonial">
          <img src="./user.svg" alt="User icon" className="testimonial-icon" />
          <h3>harmanjit </h3>
            <p>Los Angeles, CA</p>
            <p>"I was impressed by the wide selection of cars and their competitive prices. The rental process was seamless, and I would definitely use this service again."</p>
          </div>
          <div className="testimonial">
          <img src="./user.svg" alt="User icon" className="testimonial-icon" />
          <h3>Sajja</h3>
            <p>Chicago, IL</p>
            <p>"I was really impressed with the customer service. They helped me find the perfect car for my needs and made the rental process a breeze. I highly recommend this service."</p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
