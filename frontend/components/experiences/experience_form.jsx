import React, { useEffect, useState } from 'react';

const months = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September', 
  'October', 
  'November', 
  'December'
];

const empTypes = [
  '-', 
  'Full-time', 
  'Part-time', 
  'Self-employed', 
  'Freelance', 
  'Contract', 
  'Internship', 
  'Apprenticeship', 
  'Seasonal'
];
const ExperienceForm = ({ 
  experienceProp, 
  formType, 
  closeModal,
  processForm, 
  deleteExperience 
}) => {
  const [formState, setFormState] = useState({
    ...experienceProp,
    startMon: '',
    endMon: '',
    startYear: '',
    endYear: '',
    titleErr: false,
    companyErr: false,
    yearErr: false,
    futureErr: false,
    present: true
  });

  let yearErrMsg = '';

  useEffect(() => {
    if (experienceProp) {
      if (experienceProp.startDate) {
        const startDateStr = `${experienceProp.startDate.slice(5, 10)}-${experienceProp.startDate.slice(0, 4)}`;
        const startDate = new Date(startDateStr);
        
        setFormState({ 
          ...formState, 
          startMon: months[startDate.getMonth()],
          startYear: startDate.getFullYear()
        });
      }
      
      if (experienceProp.endDate) {
        const endDateStr = `${experienceProp.endDate.slice(5, 10)}-${experienceProp.endDate.slice(0, 4)}`;
        const endDate = new Date(endDateStr);
        
        setFormState({
          ...formState,
          endMon: months[endDate.getMonth()],
          endYear: endDate.getFullYear(),
          present: false
        });
      }
    }
  }, []);

  const handleInput = (field) => {
    return e => {
      if (field === 'employmentType' && e.target.value === '-') {
        setFormState({ ...formState, employmentType: '' });
      } else {
        setFormState({ ...formState, [field]: e.target.value });
      }
    }
  };

  const checkError = (field) => {
    return e => {
      if (e.target.value === '') {
        setFormState({ ...formState, [field]: true });
      } else {
        setFormState({ ...formState, [field]: false });
      }
    }
  };

  const checkYearError = () => {
    const { startYear, endYear, startMon, endMon, present } = formState;
    const startYr = parseInt(startYear);
    const endYr = parseInt(endYear);
    let res = false;

    if (!startYear.length && !startMon.length) {
      setFormState({ ...formState, yearErr: true });
      yearErrMsg = 'Please enter your start date';
      res = true;

    } else if (!present && !endYear.length && !endMon.length) {
      setFormState({ ...formState, yearErr: true });
      yearErrMsg = 'Please enter your end date';
      res = true;

    } else if (startYr > endYr || (startYr === endYr && months.indexOf(startMon) > months.indexOf(endMon))) {
      setFormState({ ...formState, yearErr: true });
      yearErrMsg = "Your start date can't be after your end date";
      res = true;

    } else {
      setFormState({ ...formState, yearErr: false });
    }

    if (Date.parse(`${months.indexOf(endMon) + 1}-01-${endYear}`) > Date.now()) {
      setFormState({ ...formState, futureErr: true });
      res = true;
    } else {
      setFormState({ ...formState, futureErr: false });
    }

    return res;
  };

  const handleErrors = () => {
    const { title, company } = formState;
    let errorBool = false;

    errorBool = checkYearError();

    if (!title.length) {
      setFormState({ ...formState, titleErr: true });
      errorBool = true;
    }

    if (!company.length) {
      setFormState({ ...formState, companyErr: true });
      errorBool = true;
    }

    return errorBool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!handleErrors()) {
      const { 
        startYear, startMon, endYear, endMon, present, userId, employmentType 
      } = formState;
  
      const start_date = `${startYear}-${months.indexOf(startMon) + 1}-01`
      let end_date = null;
  
      if (!present) {
        end_date = `${endYear}-${months.indexOf(endMon) + 1}-01`
      }
      
      processForm({
        ...formState,
        user_id: userId,
        start_date,
        end_date,
        employment_type: employmentType
      });
      closeModal();
    }
  };

  const togglePresent = () => {
    setFormState({ ...formState, present: !formState.present });
  };

  const {
    id, title, company, location, description, titleErr, companyErr, yearErr, 
    futureErr, present, industry, headline, employmentType, startMon, startYear,
    endMon, endYear
  } = formState;

  const monthOptions = months.map(mon => (
    <option key={mon} value={mon}>{mon}</option>
  ));

  const years = [];
  for (let i = 1962; i <= 2021; i++) {
    years.unshift(i);
  }
  
  const endDateSelectors = present 
    ? <p>Present</p> 
    : (
      <>
        <select className={'exp-selector-form ' + (futureErr ? 'input-error' : '')}
          onChange={handleInput('endMon')}
          onBlur={checkYearError}
          value={endMon}
        >
          <option value="Month">Month</option>
          {monthOptions}
        </select>
        <select className={'exp-selector-form ' + (futureErr ? 'input-error' : '')}
          onChange={handleInput('endYear')}
          onBlur={checkYearError}
          value={endYear}
        >
          <option value="Year">Year</option>
          {years.map(yr => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </>
    )

  const deleteBtn = deleteExperience 
    ? (<button onClick={() => {deleteExperience(id); closeModal()}}>
         Delete
       </button>) 
    : null;

  return (
    <div className='modal edu-form-modal'>
      <header>
        <h2>{formType}</h2>
        <span className='close-modal-button' onClick={() => closeModal()}>✕</span>
      </header>
      <form className='exp-form'>
        <label>Title *</label>
        <input type="text" className={titleErr ? 'input-error': ''} value={title} 
                onChange={handleInput('title')}
                onBlur={checkError('titleErr')}
        />
        {titleErr 
          ? <p className='error-msg'>Please enter your title</p> 
          : null
        }
        <label>Employment type</label>
        <select onChange={handleInput('employmentType')}
                value={employmentType}
        >
          {empTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <label>Company *</label>
        <input type="text" className={companyErr ? 'input-error' : ''} value={company}
                onChange={handleInput('company')}
                onBlur={checkError('companyErr')}
        />
        {companyErr 
          ? <p className='error-msg'>Please enter a company name</p> 
          : null
        }
        <label>Location</label>
        <input type="text" value={location} onChange={handleInput('location')}/>
        <label className='checkbox'>
          <input type="checkbox" checked={present ? true : false} 
                  onChange={togglePresent}
          /> I am currently working this role
        </label>
        <div className='exp-years-form'>
          <div className='exp-year-form' >
            <label>Start Date *</label>
            <div className='exp-date'>
              <select className={'exp-selector-form ' + (yearErr ? 'input-error' : '')} 
                      onChange={handleInput('startMon')}
                      onBlur={checkYearError}
                      value={startMon}
              >
                <option value="Month">Month</option>
                {monthOptions}
              </select>
              <select className={'exp-selector-form ' + (yearErr ? 'input-error' : '')} 
                      onChange={handleInput('startYear')}
                      onBlur={checkYearError}
                      value={startYear}
              >
                <option value="Year">Year</option>
                {years.map(yr => {
                  if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                })}
              </select>
            </div>
          </div>
          <div className='exp-year-form'>
            <label>End Date *</label>
            <div className='exp-date'>
              {endDateSelectors}
            </div>
          </div>
          {yearErr 
            ? <p className='error-msg'>{yearErrMsg}</p> 
            : <div></div>
          }
          {futureErr 
            ? <p className='error-msg'>Your end date cannot be in the future</p> 
            : <div></div>
          }
        </div>
        <label>Industry</label>
        <input type='text' value={industry} onChange={handleInput('industry')}/>
        <label>Headline</label>
        <input type='text' value={headline} onChange={handleInput('headline')}/>
        <label>Description</label>
        <textarea value={description} onChange={handleInput('description')}/>
      </form>
      <footer className='exp-edu-footer'>
        <button onClick={handleSubmit}>Save</button>
        {deleteBtn}
      </footer>
    </div>
  );
};

export default ExperienceForm;