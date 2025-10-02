import Input from "@/components/Store/Tags/Input";
import HyperLink from "@/components/Store/Tags/Link";

interface User {
  name: string;
  email?: string;
}

interface Review {
  rating: number;
  title: string;
  review: string;
  user: User;
  link?: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="rounded-xl p-4 w-[350px] font-sans text-white relative flex flex-col">
      {/* header */}
      <div className="flex items-center bg-black rounded-t-xl px-4 py-3 relative">
        <img
          src="upload/images/others/review_customer.png"
          alt={review.user.name}
          className="rounded-full w-[80px] h-[80px] object-cover"
        />
        <div className="flex-1 pl-3">
          <div className="flex justify-between items-center">
            <h3 className="m-0 text-md font-bold text-white">{review.user.name}</h3>
            {review.link && (
              <HyperLink
                target="_blank"
                to={review.link}
                text="see review"
                className="text-xs underline"
              />
            )}
          </div>
          <p className="m-0 text-xs italic text-gray-300">customer</p>
        </div>
        <span className="text-pink-500 text-3xl font-bold ml-2">❝</span>
      </div>

      {/* body */}
      <div className="bg-white text-black rounded-lg p-4 mt-3 text-sm leading-relaxed">
        <p>{review.review}</p>
      </div>

      {/* footer */}
      <div className="text-center mt-3 flex justify-center">
        <Input
          lock={true}
          type="stars"
          name="rating"
          value={review.rating}
          className="text-pink-500 text-[22px] tracking-[2px]"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
