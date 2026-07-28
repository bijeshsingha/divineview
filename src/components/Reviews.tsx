export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Saurabh K.",
      rating: 5,
      text: "The service here is absolutely exceptional. The staff went above and beyond to make our stay comfortable. The property is very well maintained and perfectly located.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Anjali D.",
      rating: 5,
      text: "Beautiful property with spotless cleanliness. We stayed for one night before heading to Shillong and the front desk was incredibly helpful with our travel arrangements.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Vikram S.",
      rating: 4,
      text: "Great atmosphere and very accessible location right in the heart of the city. The rooms are clean and the overall experience was very pleasant.",
      date: "2 months ago"
    },
    {
      id: 4,
      name: "Priya M.",
      rating: 5,
      text: "We booked the Family Executive room and it was incredibly spacious. The food was delicious and the staff arranged our Kaziranga trip flawlessly.",
      date: "3 months ago"
    },
    {
      id: 5,
      name: "Rahul T.",
      rating: 5,
      text: "Best hotel in Guwahati! The WiFi speed was excellent for my work meetings and the 24/7 hot water was a blessing.",
      date: "4 months ago"
    },
    {
      id: 6,
      name: "Meera C.",
      rating: 4,
      text: "A very comfortable stay. The proximity to the railway station is unbeatable. Highly recommend to anyone transiting through Guwahati.",
      date: "5 months ago"
    }
  ];

  return (
    <section id="reviews" className="scroll-mt-20 bg-gray-50 border-t border-gray-100 min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Guest Reviews
          </h2>
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">4.4</span>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    {star <= 4 ? (
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    ) : (
                      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                    )}
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 font-medium">Based on 2,551 Google Reviews</p>
          </div>
        </div>

        {/* Reviews Horizontal Scroll Mobile / Grid Desktop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {reviews.map((review) => (
            <div key={review.id} className="flex-none w-[85%] sm:w-[350px] md:w-auto md:flex-none snap-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{review.text}"</p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-900">{review.name}</span>
                <span className="text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
