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
    </div>
  );
};

export default HomePage;
