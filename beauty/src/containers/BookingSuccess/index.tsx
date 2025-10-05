import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { CircleCheck as CheckIcon, Calendar as CalendarIcon, Apple as AppleIcon } from 'lucide-react'

const BookingSuccess: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()

  const handleAddToGoogleCalendar = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    const title = encodeURIComponent('Tohanniees Skincare Appointment')
    const details = encodeURIComponent(`Your booking confirmation number is: ${bookingId}`)
    const url = `${baseUrl}&text=${title}&details=${details}`
    window.open(url, '_blank')
  }

  const handleAddToAppleCalendar = () => {
    window.alert(
      'To add to Apple Calendar:\n\n' +
      '1. Open the Calendar app on your iPhone\n' +
      '2. Tap the "+" button to create a new event\n' +
      '3. Add the event details\n' +
      `4. Include your booking number: ${bookingId}`
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eabe30]/10 to-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] p-8 md:p-12">
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckIcon className="w-16 h-16 text-green-600" strokeWidth={2} />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1c1c1c] [font-family:'Bricolage_Grotesque',Helvetica]">
              Booking Confirmed!
            </h1>

            <p className="text-lg text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
              Thank you for booking with Tohanniees Skincare
            </p>

            <div className="bg-[#eabe30]/10 rounded-[10px] p-6 mt-6">
              <p className="text-sm text-[#1c1c1c]/60 [font-family:'Poppins',Helvetica] mb-2">
                Your Booking Confirmation Number
              </p>
              <p className="text-2xl font-bold text-[#1c1c1c] [font-family:'Bricolage_Grotesque',Helvetica]">
                #{bookingId}
              </p>
              <p className="text-xs text-[#1c1c1c]/50 [font-family:'Poppins',Helvetica] mt-2">
                Keep this number for your records
              </p>
            </div>
          </div>

          <div className="w-full max-w-md space-y-4 mt-8">
            <p className="text-center text-base text-[#1c1c1c] [font-family:'Poppins',Helvetica] mb-4">
              A confirmation email has been sent to you with all the details. Add this appointment to your calendar:
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToGoogleCalendar}
                className="flex-1 bg-white border-2 border-[#eabe30] text-[#1c1c1c] hover:bg-[#eabe30]/10 py-3 rounded-[5px] [font-family:'Poppins',Helvetica] font-medium"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Google Calendar
              </Button>

              <Button
                onClick={handleAddToAppleCalendar}
                className="flex-1 bg-white border-2 border-[#eabe30] text-[#1c1c1c] hover:bg-[#eabe30]/10 py-3 rounded-[5px] [font-family:'Poppins',Helvetica] font-medium"
              >
                <AppleIcon className="w-5 h-5 mr-2" />
                Apple Calendar
              </Button>
            </div>
          </div>

          <div className="w-full max-w-md space-y-3 mt-8">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-[#eabe30] hover:bg-[#d4a820] text-[#1c1c1c] py-3 rounded-[5px] [font-family:'Poppins',Helvetica] font-medium text-base"
            >
              Back to Home
            </Button>

            <Button
              onClick={() => navigate('/services')}
              className="w-full bg-white border border-[#1c1c1c]/20 text-[#1c1c1c] hover:bg-[#1c1c1c]/5 py-3 rounded-[5px] [font-family:'Poppins',Helvetica] font-medium text-base"
            >
              Browse More Services
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#1c1c1c]/60 [font-family:'Poppins',Helvetica]">
              Questions? Contact us at{' '}
              <a href="mailto:support@tohannieesskincare.com" className="text-[#eabe30] hover:underline">
                support@tohannieesskincare.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess
