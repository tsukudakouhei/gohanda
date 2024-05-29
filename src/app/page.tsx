"use client"; 
import { useEffect, useState } from 'react';
import ReviewForm from '../features/top-map/components/ReviewForm';
import Map from '../features/top-map/components/Map';

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const locations = reviews.map(review => ({
    id: review.id,
    lat: parseFloat(review.location.split(',')[0]),
    lng: parseFloat(review.location.split(',')[1]),
  }));

  return (
    <div>
      <h1>五反田の飲食店の口コミ</h1>
      <ReviewForm />
      <Map locations={locations} />
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h2>{review.restaurantName}</h2>
            <p>食事名: {review.mealName}</p>
            <p>価格: {review.price}</p>
            <p>おすすめ度: {review.rating}</p>
            <p>コメント: {review.comment}</p>
            <p>ジャンル: {review.genre}</p>
            <img src={review.imageUrl} alt={review.mealName} />
            <p>場所: {review.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
