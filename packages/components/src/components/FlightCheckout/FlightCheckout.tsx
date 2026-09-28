import React, { useState } from 'react';
import './FlightCheckout.scss';

export interface FlightOption {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
}

export interface PassengerDetail {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface CheckoutState {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengerCount: number;
  cabinClass: 'economy' | 'business' | 'first';
  selectedFlight: FlightOption | null;
  selectedSeats: string[];
  passengers: PassengerDetail[];
  payment: PaymentInfo;
}

export interface FlightCheckoutProps {
  initialValues?: Partial<CheckoutState>;
  onComplete: (booking: CheckoutState) => void;
  onCancel?: () => void;
  currency?: string;
}

const STEPS = ['Search', 'Flights', 'Seats', 'Passengers', 'Payment', 'Confirm'];

const MOCK_FLIGHTS: FlightOption[] = [
  { id: 'f1', airline: 'Oceanic Airlines', departureTime: '08:00', arrivalTime: '11:30', duration: '3h 30m', stops: 0, price: 299 },
  { id: 'f2', airline: 'Global Air', departureTime: '10:15', arrivalTime: '14:00', duration: '3h 45m', stops: 1, price: 245 },
  { id: 'f3', airline: 'Sunrise Airways', departureTime: '13:00', arrivalTime: '16:20', duration: '3h 20m', stops: 0, price: 350 },
  { id: 'f4', airline: 'Oceanic Airlines', departureTime: '16:45', arrivalTime: '20:15', duration: '3h 30m', stops: 0, price: 310 },
  { id: 'f5', airline: 'Night Owl Flights', departureTime: '22:30', arrivalTime: '02:00', duration: '3h 30m', stops: 0, price: 199 },
];

const FlightSearchStep = ({ state, update, onNext }: any) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    const newErrors = [];
    if (!state.origin.trim()) newErrors.push('Origin is required');
    if (!state.destination.trim()) newErrors.push('Destination is required');
    if (!state.departDate) newErrors.push('Departure date is required');
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      onNext();
    }
  };

  return (
    <div className="ds-FlightCheckout__step">
      <h2>Search Flights</h2>
      {errors.length > 0 && (
        <div className="ds-FlightCheckout__errors" role="alert">
          {errors.map((err, i) => <div key={i}>{err}</div>)}
        </div>
      )}
      
      <div className="ds-FlightCheckout__form-group">
        <label>Origin</label>
        <input 
          type="text" 
          value={state.origin} 
          onChange={e => update({ origin: e.target.value })} 
          aria-label="Origin"
        />
      </div>

      <div className="ds-FlightCheckout__form-group">
        <label>Destination</label>
        <input 
          type="text" 
          value={state.destination} 
          onChange={e => update({ destination: e.target.value })} 
          aria-label="Destination"
        />
      </div>

      <div className="ds-FlightCheckout__form-row">
        <div className="ds-FlightCheckout__form-group">
          <label>Depart Date</label>
          <input 
            type="date" 
            value={state.departDate} 
            onChange={e => update({ departDate: e.target.value })} 
            aria-label="Depart Date"
          />
        </div>
        <div className="ds-FlightCheckout__form-group">
          <label>Return Date</label>
          <input 
            type="date" 
            value={state.returnDate} 
            onChange={e => update({ returnDate: e.target.value })} 
            aria-label="Return Date"
          />
        </div>
      </div>

      <div className="ds-FlightCheckout__form-row">
        <div className="ds-FlightCheckout__form-group">
          <label>Passengers</label>
          <div className="ds-FlightCheckout__counter">
            <button 
              type="button" 
              onClick={() => update({ passengerCount: Math.max(1, state.passengerCount - 1) })}
              aria-label="Decrease passengers"
            >-</button>
            <span>{state.passengerCount}</span>
            <button 
              type="button" 
              onClick={() => update({ passengerCount: Math.min(9, state.passengerCount + 1) })}
              aria-label="Increase passengers"
            >+</button>
          </div>
        </div>
        <div className="ds-FlightCheckout__form-group">
          <label>Cabin Class</label>
          <select 
            value={state.cabinClass} 
            onChange={e => update({ cabinClass: e.target.value })}
            aria-label="Cabin Class"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
      </div>

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary" onClick={handleNext}>
          Search Flights
        </button>
      </div>
    </div>
  );
};

const SelectFlightStep = ({ state, update, onNext, onBack, currency }: any) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!state.selectedFlight) {
      setError('Please select a flight to continue.');
    } else {
      setError('');
      onNext();
    }
  };

  return (
    <div className="ds-FlightCheckout__step">
      <h2>Select Flight</h2>
      {error && <div className="ds-FlightCheckout__errors" role="alert">{error}</div>}
      
      <div className="ds-FlightCheckout__flight-list" role="radiogroup" aria-label="Available flights">
        {MOCK_FLIGHTS.map(flight => (
          <div 
            key={flight.id}
            className={`ds-FlightCheckout__flight-card ${state.selectedFlight?.id === flight.id ? 'ds-FlightCheckout__flight-card--selected' : ''}`}
            onClick={() => update({ selectedFlight: flight })}
            role="radio"
            aria-checked={state.selectedFlight?.id === flight.id}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') update({ selectedFlight: flight }); }}
          >
            <div className="ds-FlightCheckout__flight-info">
              <strong>{flight.airline}</strong>
              <span>{flight.departureTime} - {flight.arrivalTime}</span>
              <span>{flight.duration} | {flight.stops} stops</span>
            </div>
            <div className="ds-FlightCheckout__flight-price">
              {currency}{flight.price}
            </div>
          </div>
        ))}
      </div>

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn" onClick={onBack}>Back</button>
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary" onClick={handleNext}>
          Continue to Seats
        </button>
      </div>
    </div>
  );
};

const SeatMapStep = ({ state, update, onNext, onBack }: any) => {
  const [error, setError] = useState('');
  
  const toggleSeat = (seatId: string, isTaken: boolean) => {
    if (isTaken) return;
    
    let newSeats = [...state.selectedSeats];
    if (newSeats.includes(seatId)) {
      newSeats = newSeats.filter(s => s !== seatId);
    } else {
      if (newSeats.length >= state.passengerCount) {
        newSeats.shift(); // remove oldest selection if at max
      }
      newSeats.push(seatId);
    }
    update({ selectedSeats: newSeats });
  };

  const handleNext = () => {
    if (state.selectedSeats.length !== state.passengerCount) {
      setError(`Please select exactly ${state.passengerCount} seat(s).`);
    } else {
      setError('');
      onNext();
    }
  };

  return (
    <div className="ds-FlightCheckout__step">
      <h2>Select Seats</h2>
      <p>Please select {state.passengerCount} seat(s).</p>
      {error && <div className="ds-FlightCheckout__errors" role="alert">{error}</div>}
      
      <div className="ds-FlightCheckout__seat-map-container">
        <div className="ds-FlightCheckout__seat-legend">
          <span className="ds-FlightCheckout__seat ds-FlightCheckout__seat--available">Available</span>
          <span className="ds-FlightCheckout__seat ds-FlightCheckout__seat--taken">Taken</span>
          <span className="ds-FlightCheckout__seat ds-FlightCheckout__seat--selected">Selected</span>
        </div>

        <div className="ds-FlightCheckout__seat-grid" role="grid" aria-label="Seat map">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="ds-FlightCheckout__seat-row" role="row">
              <span className="ds-FlightCheckout__row-num">{rowIndex + 1}</span>
              {['A', 'B', 'C', 'D', 'E', 'F'].map((col, colIndex) => {
                const seatId = `${rowIndex + 1}${col}`;
                // deterministically mock some taken seats
                const isTaken = (rowIndex * 6 + colIndex) % 7 === 0;
                const isSelected = state.selectedSeats.includes(seatId);
                
                let seatClass = 'ds-FlightCheckout__seat--available';
                if (isTaken) seatClass = 'ds-FlightCheckout__seat--taken';
                if (isSelected) seatClass = 'ds-FlightCheckout__seat--selected';

                return (
                  <React.Fragment key={seatId}>
                    {colIndex === 3 && <div className="ds-FlightCheckout__aisle" />}
                    <button
                      type="button"
                      className={`ds-FlightCheckout__seat ${seatClass}`}
                      onClick={() => toggleSeat(seatId, isTaken)}
                      disabled={isTaken}
                      role="gridcell"
                      aria-label={`Seat ${seatId} ${isTaken ? 'Taken' : isSelected ? 'Selected' : 'Available'}`}
                      aria-selected={isSelected}
                    >
                      {seatId}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn" onClick={onBack}>Back</button>
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary" onClick={handleNext}>
          Continue to Passengers
        </button>
      </div>
    </div>
  );
};

const PassengersStep = ({ state, update, onNext, onBack }: any) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    const newErrors = [];
    for (let i = 0; i < state.passengerCount; i++) {
      const p = state.passengers[i] || {};
      if (!p.title || !p.firstName || !p.lastName || !p.dateOfBirth || !p.passportNumber || !p.nationality) {
        newErrors.push(`Please fill out all fields for Passenger ${i + 1}`);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      onNext();
    }
  };

  const updatePassenger = (index: number, field: keyof PassengerDetail, value: string) => {
    const newPassengers = [...state.passengers];
    if (!newPassengers[index]) {
      newPassengers[index] = { title: 'Mr', firstName: '', lastName: '', dateOfBirth: '', passportNumber: '', nationality: '' };
    }
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    update({ passengers: newPassengers });
  };

  return (
    <div className="ds-FlightCheckout__step">
      <h2>Passenger Details</h2>
      {errors.length > 0 && (
        <div className="ds-FlightCheckout__errors" role="alert">
          {errors.map((err, i) => <div key={i}>{err}</div>)}
        </div>
      )}

      {Array.from({ length: state.passengerCount }).map((_, i) => {
        const p = state.passengers[i] || { title: 'Mr', firstName: '', lastName: '', dateOfBirth: '', passportNumber: '', nationality: '' };
        return (
          <div key={i} className="ds-FlightCheckout__passenger-form">
            <h3>Passenger {i + 1}</h3>
            
            <div className="ds-FlightCheckout__form-row">
              <div className="ds-FlightCheckout__form-group" style={{ flex: '0 0 100px' }}>
                <label>Title</label>
                <select value={p.title} onChange={e => updatePassenger(i, 'title', e.target.value)} aria-label={`Passenger ${i+1} Title`}>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="ds-FlightCheckout__form-group">
                <label>First Name</label>
                <input type="text" value={p.firstName} onChange={e => updatePassenger(i, 'firstName', e.target.value)} aria-label={`Passenger ${i+1} First Name`} />
              </div>
              <div className="ds-FlightCheckout__form-group">
                <label>Last Name</label>
                <input type="text" value={p.lastName} onChange={e => updatePassenger(i, 'lastName', e.target.value)} aria-label={`Passenger ${i+1} Last Name`} />
              </div>
            </div>

            <div className="ds-FlightCheckout__form-row">
              <div className="ds-FlightCheckout__form-group">
                <label>Date of Birth</label>
                <input type="date" value={p.dateOfBirth} onChange={e => updatePassenger(i, 'dateOfBirth', e.target.value)} aria-label={`Passenger ${i+1} Date of Birth`} />
              </div>
              <div className="ds-FlightCheckout__form-group">
                <label>Passport Number</label>
                <input type="text" value={p.passportNumber} onChange={e => updatePassenger(i, 'passportNumber', e.target.value)} aria-label={`Passenger ${i+1} Passport`} />
              </div>
              <div className="ds-FlightCheckout__form-group">
                <label>Nationality</label>
                <input type="text" value={p.nationality} onChange={e => updatePassenger(i, 'nationality', e.target.value)} aria-label={`Passenger ${i+1} Nationality`} />
              </div>
            </div>
          </div>
        );
      })}

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn" onClick={onBack}>Back</button>
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary" onClick={handleNext}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

const PaymentStep = ({ state, update, onNext, onBack }: any) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    const parts = val.match(/.{1,4}/g);
    const formatted = parts ? parts.join(' ') : '';
    update({ payment: { ...state.payment, cardNumber: formatted } });
  };

  const handleNext = () => {
    const { cardNumber, expiryDate, cvv, nameOnCard } = state.payment;
    const newErrors = [];
    
    if (cardNumber.replace(/\D/g, '').length !== 16) newErrors.push('Card number must be 16 digits');
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) newErrors.push('Expiry date must be MM/YY');
    if (!/^\d{3,4}$/.test(cvv)) newErrors.push('CVV must be 3 or 4 digits');
    if (!nameOnCard.trim()) newErrors.push('Name on card is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      onNext();
    }
  };

  return (
    <div className="ds-FlightCheckout__step">
      <h2>Payment Information</h2>
      {errors.length > 0 && (
        <div className="ds-FlightCheckout__errors" role="alert">
          {errors.map((err, i) => <div key={i}>{err}</div>)}
        </div>
      )}

      <div className="ds-FlightCheckout__payment-secure">
        <span>🔒 Secure Payment</span>
      </div>

      <div className="ds-FlightCheckout__form-group">
        <label>Name on Card</label>
        <input 
          type="text" 
          value={state.payment.nameOnCard} 
          onChange={e => update({ payment: { ...state.payment, nameOnCard: e.target.value } })} 
          aria-label="Name on Card"
        />
      </div>

      <div className="ds-FlightCheckout__form-group">
        <label>Card Number</label>
        <input 
          type="text" 
          value={state.payment.cardNumber} 
          onChange={handleCardChange}
          placeholder="XXXX XXXX XXXX XXXX"
          aria-label="Card Number"
        />
      </div>

      <div className="ds-FlightCheckout__form-row">
        <div className="ds-FlightCheckout__form-group">
          <label>Expiry Date</label>
          <input 
            type="text" 
            value={state.payment.expiryDate} 
            onChange={e => update({ payment: { ...state.payment, expiryDate: e.target.value } })} 
            placeholder="MM/YY"
            aria-label="Expiry Date"
          />
        </div>
        <div className="ds-FlightCheckout__form-group">
          <label>CVV</label>
          <input 
            type="password" 
            value={state.payment.cvv} 
            onChange={e => update({ payment: { ...state.payment, cvv: e.target.value.substring(0, 4) } })} 
            placeholder="123"
            aria-label="CVV"
          />
        </div>
      </div>

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn" onClick={onBack}>Back</button>
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary" onClick={handleNext}>
          Review Booking
        </button>
      </div>
    </div>
  );
};

const ConfirmStep = ({ state, onComplete, onBack, currency }: any) => {
  const flight = state.selectedFlight;
  const total = (flight?.price || 0) * state.passengerCount;

  return (
    <div className="ds-FlightCheckout__step ds-FlightCheckout__step--confirm">
      <h2>Review & Confirm</h2>
      
      <div className="ds-FlightCheckout__summary-box">
        <h3>Flight Details</h3>
        <p><strong>{state.origin} to {state.destination}</strong></p>
        <p>{flight?.airline} | {flight?.departureTime} - {flight?.arrivalTime}</p>
        <p>Cabin: {state.cabinClass}</p>
        <p>Seats: {state.selectedSeats.join(', ')}</p>
      </div>

      <div className="ds-FlightCheckout__summary-box">
        <h3>Passengers</h3>
        {state.passengers.map((p: any, i: number) => (
          <p key={i}>{p.title} {p.firstName} {p.lastName}</p>
        ))}
      </div>

      <div className="ds-FlightCheckout__summary-total">
        <span>Total Price:</span>
        <strong>{currency}{total}</strong>
      </div>

      <div className="ds-FlightCheckout__actions">
        <button type="button" className="ds-FlightCheckout__btn" onClick={onBack}>Back</button>
        <button type="button" className="ds-FlightCheckout__btn ds-FlightCheckout__btn--primary ds-FlightCheckout__btn--large" onClick={() => onComplete(state)}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export const FlightCheckout: React.FC<FlightCheckoutProps> = ({
  initialValues = {},
  onComplete,
  onCancel,
  currency = '$'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [state, setState] = useState<CheckoutState>({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengerCount: 1,
    cabinClass: 'economy',
    selectedFlight: null,
    selectedSeats: [],
    passengers: [],
    payment: { cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' },
    ...initialValues
  });

  const updateState = (updates: Partial<CheckoutState>) => setState(prev => ({ ...prev, ...updates }));

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="ds-FlightCheckout">
      <div className="ds-FlightCheckout__stepper">
        {STEPS.map((label, index) => (
          <div 
            key={index} 
            className={`ds-FlightCheckout__step-indicator ${index <= currentStep ? 'ds-FlightCheckout__step-indicator--active' : ''}`}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            <div className="ds-FlightCheckout__step-circle">{index + 1}</div>
            <span className="ds-FlightCheckout__step-label">{label}</span>
          </div>
        ))}
      </div>

      <div className={`ds-FlightCheckout__content ${isAnimating ? 'ds-FlightCheckout__content--animating' : ''}`}>
        {currentStep === 0 && <FlightSearchStep state={state} update={updateState} onNext={handleNext} />}
        {currentStep === 1 && <SelectFlightStep state={state} update={updateState} onNext={handleNext} onBack={handleBack} currency={currency} />}
        {currentStep === 2 && <SeatMapStep state={state} update={updateState} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <PassengersStep state={state} update={updateState} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 4 && <PaymentStep state={state} update={updateState} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 5 && <ConfirmStep state={state} onComplete={onComplete} onBack={handleBack} currency={currency} />}
      </div>
    </div>
  );
};

export default FlightCheckout;
