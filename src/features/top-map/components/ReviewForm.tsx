import { useState } from 'react';

const genres = [
  { value: 'JAPANESE', label: '和食' },
  { value: 'CHINESE', label: '中華' },
  { value: 'WESTERN', label: '洋食' },
  { value: 'ITALIAN', label: 'イタリアン' },
  { value: 'FRENCH', label: 'フレンチ' },
  { value: 'KOREAN', label: '韓国料理' },
  { value: 'INDIAN', label: 'インド料理' },
  { value: 'OTHER', label: 'その他' }
];

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '', mealName: '', price: '', rating: '', comment: '', genre: '', imageUrl: '', location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ restaurantName: '', mealName: '', price: '', rating: '', comment: '', genre: '', imageUrl: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="restaurantName" value={formData.restaurantName} onChange={handleChange} placeholder="店名" required />
      <input name="mealName" value={formData.mealName} onChange={handleChange} placeholder="食事名" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="価格" required />
      <input name="rating" value={formData.rating} onChange={handleChange} placeholder="おすすめ度" required />
      <input name="comment" value={formData.comment} onChange={handleChange} placeholder="コメント" />
      <select name="genre" value={formData.genre} onChange={handleChange} required>
        <option value="" disabled>ジャンルを選択</option>
        {genres.map((genre) => (
          <option key={genre.value} value={genre.value}>{genre.label}</option>
        ))}
      </select>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="画像URL" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="場所（緯度,経度）" required />
      <button type="submit">口コミを追加</button>
    </form>
  );
};

export default ReviewForm;
