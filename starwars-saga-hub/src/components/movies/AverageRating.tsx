import { Rating } from '../../utils/constants'
import { useMemo } from 'react'

interface Props {
  ratings: Rating[]
}

const AverageRating = ({ ratings }: Props) => {
  const averageValue = useMemo(() => calculateAverageRating(ratings), [ratings])

  return (
    <div className='rating rating-xs sm:rating-sm items-center'>
      {Array.from({ length: 10 }, (_, index) => (
        <input
          key={index}
          type='radio'
          name='rating'
          className={`mask mask-star-2 ${
            averageValue
              ? index + 1 <= averageValue
                ? 'bg-orange-400'
                : undefined
              : 'bg-slate-300'
          }`}
          defaultChecked={index + 1 === averageValue}
          disabled
        />
      ))}
      <span className='ml-2 text-slate-600 sm:text-xs'>
        {averageValue ? `${averageValue}/10` : 'Not Rated'}
      </span>
    </div>
  )
}

// Parses rating string "8/10", "80%" into a numeric percentage
const parseRating = (value: string): number | null => {
  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number)
    return (numerator / denominator) * 100
  } else if (value.includes('%')) {
    return parseFloat(value)
  }
  return null
}

// Calculates the average rating and returns 1-10 range
const calculateAverageRating = (ratings: Rating[]): number => {
  const numericRatings = ratings
    .map(rating => parseRating(rating.Value))
    .filter((rating): rating is number => rating !== null)

  if (numericRatings.length === 0) return 0

  const averagePercentage =
    numericRatings.reduce((sum, rating) => sum + rating, 0) /
    numericRatings.length
  return Math.round(averagePercentage / 10)
}

export default AverageRating
