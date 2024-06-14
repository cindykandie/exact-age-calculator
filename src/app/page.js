'use client'
import { useState } from 'react';

export default function Home() {
  // State variables to manage input values for day, month, year and calculated age
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
  const [errors, setErrors] = useState({ day: false, month: false, year: false });

  // Function to calculate age based on input date
  const calculateAge = () => {
    // Validate inputs
    let hasError = false;
    let newErrors = { day: false, month: false, year: false };

    if (!day) {
      newErrors.day = true;
      hasError = true;
    }
    if (!month) {
      newErrors.month = true;
      hasError = true;
    }
    if (!year) {
      newErrors.year = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Reset errors if inputs are valid
    setErrors({ day: false, month: false, year: false });

    // Create a Date object for the birth date based on input values
    const birthDate = new Date(`${year}-${month}-${day}`);
    // Get today's date
    const today = new Date();

    // Calculate age in years, months, and days
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for negative days (borrow days from the previous month)
    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Adjust for negative months (borrow months from the previous year)
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    // Set the calculated age in the state
    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    });
  };

  // Function to handle input change and ensure only numeric values are entered
  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setState(value);
    }
  };

  return (
    <main className="rounded-br-[100px] rounded-lg max-w-[450px] m-4 p-6 bg-[#ffffff] mx-auto mt-16 ">
      <section className="mb-10">
        {/* Form to input day, month, and year */}
        <div className="flex gap-4 my-4 mx-6 relative">
          <div>
            <label htmlFor="day">DAY</label> <br />
            <input
              className={`border rounded-lg w-24 p-2 ${errors.day ? 'border-red-500' : ''}`}
              type="text"
              id="day"
              name="day"
              placeholder="DD"
              value={day}
              onChange={(e) => handleInputChange(e, setDay)}
              required
            />
            {errors.day && <p className="text-red-500">*required</p>}
          </div>
          <div>
            <label htmlFor="month">MONTH</label>
            <br />
            <input
              className={`border rounded-lg w-24 p-2 ${errors.month ? 'border-red-500' : ''}`}
              type="text"
              id="month"
              name="month"
              placeholder="MM"
              value={month}
              onChange={(e) => handleInputChange(e, setMonth)}
              required
            />
            {errors.month && <p className="text-red-500">*required</p>}
          </div>

          <div>
            <label htmlFor="year">YEAR</label>
            <br />
            <input
              className={`border rounded-lg w-24 p-2 ${errors.year ? 'border-red-500' : ''}`}
              type="text"
              id="year"
              name="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => handleInputChange(e, setYear)}
              required
            />
            {errors.year && <p className="text-red-500">*required</p>}
          </div>
          {/* Image to trigger the age calculation */}
          <img 
            className='bg-[#854dff] rounded-full w-12 h-12 p-2 cursor-pointer absolute left-[320px] top-[80px]'
            src="/icon-arrow.svg"
            alt="Calculate"
            onClick={calculateAge}
          />
        </div>
      </section>
      <hr />
      <section className="m-6 pl-6">
        {/* Display the calculated age */}
        <p className="text-5xl font-extrabold italic">
          <span className="text-[#854dff]">{age.years}</span> years
        </p>
        <p className="text-5xl font-extrabold italic">
          <span className="text-[#854dff]">{age.months}</span> months
        </p>
        <p className="text-5xl font-extrabold italic">
          <span className="text-[#854dff]">{age.days}</span> days
        </p>
      </section>
    </main>
  );
}
