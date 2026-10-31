import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Calendar, Clock, Video, Phone, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function BookCallPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('video');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-'),
      label: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  });

  const times = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    setSubmitted(true);
    toast.info('Sample selection previewed', {
      description: 'No appointment, email, or calendar invitation was created.',
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-[#B8FF3D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#B8FF3D]" />
          </div>
          <h1 className="headline-section text-white mb-4">
            Sample Selection Only
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Your illustrative selection is <strong className="text-white">{selectedDate}</strong> at{' '}
            <strong className="text-white">{selectedTime}</strong>.
          </p>
          <p className="text-white/40 text-sm mb-8">
            No call was booked. No confirmation, reminder, or calendar invitation was sent.
            These sample slots do not represent real availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              Learn About Our Process
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="headline-section text-white mb-4">
            Call Planner Preview
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore illustrative meeting types, dates, and times.
            This is not a scheduling service and shows no real availability.
          </p>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Call Type */}
          <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              How would you like to meet?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                aria-pressed={selectedType === 'video'}
                onClick={() => setSelectedType('video')}
                className={`cursor-pointer text-left p-4 rounded-[14px] border transition-all ${
                  selectedType === 'video'
                    ? 'border-[#B8FF3D] bg-[#B8FF3D]/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Video size={24} className="text-[#B8FF3D]" />
                  <div>
                    <p className="text-white font-medium">Video Call</p>
                    <p className="text-white/50 text-sm">Sample type, no meeting created</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                aria-pressed={selectedType === 'phone'}
                onClick={() => setSelectedType('phone')}
                className={`cursor-pointer text-left p-4 rounded-[14px] border transition-all ${
                  selectedType === 'phone'
                    ? 'border-[#B8FF3D] bg-[#B8FF3D]/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Phone size={24} className="text-[#B8FF3D]" />
                  <div>
                    <p className="text-white font-medium">Phone Call</p>
                    <p className="text-white/50 text-sm">Sample channel, no call placed</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-[#B8FF3D]" />
              <h3 className="font-display font-bold text-white text-lg">
                Select a Date
              </h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {dates.map((date) => (
                <button
                  key={date.value}
                  type="button"
                  aria-label={`Sample date ${date.label}`}
                  aria-pressed={selectedDate === date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedDate === date.value
                      ? 'bg-[#B8FF3D] text-[#0B0B0D]'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs opacity-70 block">
                    {date.label.split(' ')[0]}
                  </span>
                  <span className="font-medium">
                    {date.label.split(' ')[2]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} className="text-[#B8FF3D]" />
              <h3 className="font-display font-bold text-white text-lg">
                Select a Time
              </h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  aria-pressed={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedTime === time
                      ? 'bg-[#B8FF3D] text-[#0B0B0D]'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Your Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bookcallpage-field-1" className="text-white/60 text-sm mb-2 block">Full Name (optional sample)</label>
                <input id="bookcallpage-field-1"
                  type="text"
                  className="form-input"
                  placeholder="Sample Visitor"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="bookcallpage-field-2" className="text-white/60 text-sm mb-2 block">Email (optional sample)</label>
                <input id="bookcallpage-field-2"
                  type="email"
                  className="form-input"
                  placeholder="sample@example.invalid"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bookcallpage-field-3" className="text-white/60 text-sm mb-2 block">Phone (optional sample)</label>
                <input id="bookcallpage-field-3"
                  type="tel"
                  className="form-input"
                  placeholder="Leave blank for this preview"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bookcallpage-field-4" className="text-white/60 text-sm mb-2 block">Notes (Optional)</label>
                <textarea id="bookcallpage-field-4"
                  className="form-input min-h-[80px]"
                  placeholder="Anything specific you'd like to discuss?"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center">
            Preview selection
            <ArrowRight size={18} className="ml-2" />
          </button>

          <p className="text-center text-white/40 text-sm">
            This preview creates no booking or agreement. Read the{' '}
            <Link to="/terms" className="text-[#B8FF3D] hover:underline">
              prototype usage notice
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
