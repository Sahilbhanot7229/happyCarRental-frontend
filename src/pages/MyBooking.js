import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '../components/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [reviewTexts, setReviewTexts] = useState({});
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/booking/user/${user.id}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const downloadInvoice = (booking) => {
    const pdf = new jsPDF();

    // Company Logo
    const img = new Image();
    img.src = './logo.png'; // Replace with your logo path
    img.onload = function () {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = 50;
      const imgHeight = 20;
      const imgX = (pageWidth - imgWidth) / 2;
      pdf.addImage(img, 'PNG', imgX, 10, imgWidth, imgHeight); // Centered logo

      pdf.setFontSize(12);
      const dateX = pageWidth - 60;
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, dateX, 10);
      pdf.text(`Time: ${new Date().toLocaleTimeString()}`, dateX, 20);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');

      pdf.text("User Details", 10, 40);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Username: ${booking.user.username}`, 10, 45);
      pdf.text(`Email: ${booking.user.email}`, 10, 50);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Car Details", 10, 70);

      pdf.autoTable({
        startY: 80,
        head: [['Make', 'Model', 'Year', 'Plate', 'Booking Date', 'Return Date', 'Status', 'Total Price']],
        body: [
          [
            booking.car.make,
            booking.car.model,
            booking.car.year,
            booking.car.plate,
            new Date(booking.bookingDate).toLocaleDateString(),
            new Date(booking.returnDate).toLocaleDateString(),
            booking.status,
            `$${booking.totalPrice}`
          ]
        ]
      });

      const finalY = pdf.lastAutoTable.finalY;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Terms and Conditions", 10, finalY + 20);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text("1. The rental car must be returned with a full tank of gas.", 10, finalY + 30);
      pdf.text("2. Smoking is strictly prohibited in the rental car.", 10, finalY + 40);
      pdf.text("3. Any damage to the car will be the renter's responsibility.", 10, finalY + 50);
      pdf.text("4. Late returns will incur additional charges.", 10, finalY + 60);
      pdf.text("5. All traffic fines are the responsibility of the renter.", 10, finalY + 70);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Return Policy", 10, finalY + 90);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text("The car must be returned to the designated return location by the return date and time specified in the booking details.", 10, finalY + 100);
      pdf.text("Please ensure the car is in the same condition as when it was rented, with a full tank of gas.", 10, finalY + 110);
      pdf.text("Any late returns will result in additional charges as per the rental agreement.", 10, finalY + 120);
      pdf.text("If the car is returned after office hours, please use the key drop box and note the return time.", 10, finalY + 130);

      pdf.save("invoice.pdf");
    };
  };

  const handleReviewChange = (e, bookingId) => {
    setReviewTexts({ ...reviewTexts, [bookingId]: e.target.value });
  };

  const submitReview = async (bookingId) => {
    const reviewText = reviewTexts[bookingId];
    if (reviewText) {
      try {
        await axios.post(`http://localhost:5000/api/booking/add-review`, {
          userId: user.id,
          bookingId,
          review: reviewText
        });
        toast.success('Review submitted successfully');
        setReviewTexts({ ...reviewTexts, [bookingId]: '' }); // Clear the review text after submission

        // Close the text box
        setReviewTexts(prevState => {
          const newState = { ...prevState };
          delete newState[bookingId];
          return newState;
        });

        // Optionally fetch the updated bookings to reflect the new review
        // const response = await axios.get(`http://localhost:5000/api/booking/user/${user.id}`);
        // setBookings(response.data);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      toast.error('Please enter a review before submitting');
    }
  };

  if (!user) {
    return <div>Please log in to view your bookings.</div>;
  }

  if (!bookings.length) {
    return <div>No bookings found.</div>;
  }

  return (
    <section className="container">
      <ToastContainer />
      {bookings.map(booking => (
        <article key={booking._id} id={`booking-${booking._id}`} className="booking-card">
          <CarImage imageId={booking.car.imageId} />
          <div className="booking-details">
            <div className="booking-info">
              <h1 className="car-title">{booking.car.make} {booking.car.model}</h1>
              <p className="car-description">{booking.car.description}</p>
            </div>
            <div className="booking-meta">
              <div className="booking-dates">
                <div className="booking-date"><span>Booking Date: </span>{new Date(booking.bookingDate).toLocaleDateString()}</div>
                <div className="return-date"><span>Return Date: </span>{new Date(booking.returnDate).toLocaleDateString()}</div>
                <div className="total-price"><span>Total Price: </span>${booking.totalPrice}</div>
                <div className="status"><span>Status: </span>{booking.status}</div>
              </div>
              <button className="download-button" onClick={() => downloadInvoice(booking)}>Download Invoice</button>
              <div className="review-section">
                <button onClick={() => setReviewTexts({ ...reviewTexts, [booking._id]: reviewTexts[booking._id] || '' })}>
                  Give Review
                </button>
                {reviewTexts[booking._id] !== undefined && (
                  <div>
                    <textarea
                      value={reviewTexts[booking._id]}
                      onChange={(e) => handleReviewChange(e, booking._id)}
                      placeholder="Write your review here"
                    />
                    <button onClick={() => submitReview(booking._id)}>Submit Review</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

const CarImage = ({ imageId }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/images/${imageId}`, { responseType: 'arraybuffer' });
        const base64 = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const contentType = response.headers['content-type'];
        setImageSrc(`data:${contentType};base64,${base64}`);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  if (!imageSrc) {
    return <div>Loading image...</div>;
  }

  return <img className="car-image" src={imageSrc} alt="Car" />;
};

export default MyBookings;
