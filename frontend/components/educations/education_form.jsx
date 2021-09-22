import React, { useEffect } from 'react';

const EducationForm = ({
  educationProp,
  formType,
  closeModal,
  processForm,
  deleteEducation
}) => {
  const [formState, setFormState] = useState({
    ...educationProp,
    yearErr: false,
    schoolErr: false
  });

  useEffect(() => {
    if (educationProp) {
      setFormState({
        ...educationProp, 
        startYear: educationProp.startYear, 
        endYear: educationProp.endYear
      });
    }
  }, []);

  const handleInput = (field) => {
    return e => setFormState({ ...formState, [field]: e.target.value })
  };
  
  const checkSchoolError = (e) => {
    if (e.target.value === '') {
      setFormState({ ...formState, schoolErr: true });
    } else {
      setFormState({ ...formState, schoolErr: false });
    }
  };
  
  const checkYearError = () => {
    const { startYear, endYear } = formState;
    
    if (parseInt(startYear) > parseInt(endYear)) {
      setFormState({ ...formState, yearErr: true });
    } else {
      setFormState({ ...formState, yearErr: false });
    }
  };

  const handleErrors = () => {
    const { startYear, endYear } = formState;
    let errorBool = false;

    if (parseInt(startYear) > parseInt(endYear)) {
      setFormState({ ...formState, yearErr: true });
      errorBool = true;
    }

    if (!formState.school.length) {
      setFormState({ ...formState, schoolErr: true });
      errorBool = true;
    }

    return errorBool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleErrors()) {
      processForm({
        ...formState,
        user_id: formState.userId,
        start_year: formState.startYear,
        end_year: formState.endYear
      });
      closeModal();
    }
  };

  const {
    id, school, degree, field, grade, activities, description, startYear, endYear,
    schoolErr, yearErr 
  } = formState;
  const years = [];
  for (let i = 1962; i <= 2031; i++) {
    years.unshift(i);
  };

  const deleteBtn = deleteEducation 
    ? (<button onClick={() => { deleteEducation(id); closeModal() }} 
               className='delete btn'
       >Delete</button>) 
    : null;

  return (
    <div className='modal edu-form-modal'>
      <header>
        <h2>{formType}</h2>
        <span className='close-modal-button' onClick={() => closeModal()}>✕</span>
      </header>
      <form className='edu-form'>
        <label>School *</label>
        <input type="text" className={schoolErr ? 'input-error' : ''} value={school} 
                onChange={handleInput('school')}
                onBlur={checkSchoolError}
        />
        {schoolErr 
          ? <p className='error-msg'>Please enter a school name</p> 
          : null
        }
        <label>Degree</label>
        <input type="text" value={degree} onChange={handleInput('degree')}/>
        <label>Field of study</label>
        <input type="text" value={field} onChange={handleInput('field')}/>
        <div className='school-years-form'>
          <div className='school-year-form'>
            <label>Start year</label>
            <select className={'yr-selector-form ' + (yearErr ? 'input-error' : '')} 
                    onChange={handleInput('startYear')}
                    onBlur={checkYearError}
                    value={startYear}
            >
              {years.map(yr => {
                if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
              })}
            </select>
          </div>
          <div className='school-year-form'>
            <label>End year (or expected)</label>
            <select className={'yr-selector-form'} 
                    onChange={handleInput('endYear')}
                    onBlur={checkYearError}
                    value={endYear}
            >
              {years.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
          {yearErr 
            ? <p className='error-msg'>Your end year can't be earlier than your start year</p> 
            : null
          }
        </div>
        <label>Grade</label>
        <input type="text" value={grade} onChange={handleInput('grade')}/>
        <label>Activities and societies</label>
        <textarea value={activities} onChange={handleInput('activities')}/>
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

export default EducationForm;