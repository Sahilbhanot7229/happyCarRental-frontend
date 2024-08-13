import React, { useState, useEffect } from 'react';
import '../style/BookedCarList.css';

function BookedCarList() {
    const [bookings, setBookings] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/booking/getAllBookings');
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const pastBookings = bookings.filter(booking => new Date(booking.returnDate) < currentDate);
    const futureBookings = bookings.filter(booking => new Date(booking.returnDate) >= currentDate);

    return (
        <div className="booked-car-list">
            <div className="bookings-section">
                <h1>Past Bookings</h1>
                <div className="car-list">
                    {pastBookings.length > 0 ? (
                        pastBookings.map((booking, index) => (
                            <div className="car-card" key={index}>
                                {booking.car.imageId && (
                                    <img 
                                        src={`data:${booking.car.imageId.contentType};base64,${booking.car.imageId.imageBase64}`} 
                                        alt={`${booking.car.make} ${booking.car.model}`} 
                                        className="car-image"
                                    />
                                )}
                           <div className='car-detail-admin-list'>
                                <div className="car-details-admin">
                                    <h3>{booking.car.make} {booking.car.model}</h3>
                                    <p>Plate: {booking.car.plate}</p>
                                </div>
                                <div className="booking-details-admin">
                                    <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                    <p>Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
                                </div>
                                    </div>
                               
                                <div className="user-details-car-list">
                                    <div className='user-detail-name'>
                                    <p>{booking.user.firstName} {booking.user.lastName}</p>
                                    </div>
                                    <div className='user-email-phone'>
                                    <p>{booking.user.email}</p>
                                    <p>Phone: {booking.user.phoneNumber}</p>
                                </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No past bookings.</p>
                    )}
                </div>
                <h1>Future Bookings</h1>
                <div className="car-list">
                    {futureBookings.length > 0 ? (
                        futureBookings.map((booking, index) => (
                            <div className="car-card" key={index}>
                                {booking.car.imageId && (
                                    <img 
                                        src={`data:${booking.car.imageId.contentType};base64,${booking.car.imageId.imageBase64}`} 
                                        alt={`${booking.car.make} ${booking.car.model}`} 
                                        className="car-image"
                                    />
                                )}
                                <div className='car-detail-admin-list'>
                                <div className="car-details-admin">
                                    <h3>{booking.car.make} {booking.car.model}</h3>
                                    <p>Plate: {booking.car.plate}</p>
                                </div>
                                <div className="booking-details-admin">
                                    <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                    <p>Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
                                </div>
                                    </div>
                               
                                <div className="user-details-car-list">
                                    <div className='user-detail-name'>
                                    <p>{booking.user.firstName} {booking.user.lastName}</p>
                                    </div>
                                    <div className='user-email-phone'>
                                    <p>{booking.user.email}</p>
                                    <p>Phone: {booking.user.phoneNumber}</p>
                                </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No future bookings.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookedCarList;
