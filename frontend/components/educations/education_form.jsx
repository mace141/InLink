import React from 'react';

class EducationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.education,
      yearErr: false,
      schoolErr: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSchoolError = this.checkSchoolError.bind(this);
    this.checkYearError = this.checkYearError.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value })
  }
  
  checkSchoolError(e) {
    if (e.target.value == '') {
      this.setState({ schoolErr: true });
    } else {
      this.setState({ schoolErr: false });
    }
  }
  
  checkYearError() {
    const { startYear, endYear } = this.state;
    
    if (parseInt(startYear) > parseInt(endYear)) {
      this.setState({ yearErr: true });
    } else {
      this.setState({ yearErr: false });
    }
  }

  handleErrors() {
    const { startYear, endYear } = this.state;
    let errorBool = false;

    if (parseInt(startYear) > parseInt(endYear)) {
      this.setState({ yearErr: true });
      errorBool = true;
    }

    if (!this.state.school.length) {
      this.setState({ schoolErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.handleErrors()) {
      this.props.processForm({
        ...this.state,
        user_id: this.state.userId,
        start_year: this.state.startYear,
        end_year: this.state.endYear
      });
      this.props.closeModal();
    }
  }

  render() {
    const {
      id, school, degree, field, grade, activities, description, schoolErr, yearErr 
    } = this.state;
    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }

    const deleteBtn = this.props.deleteEducation ? (
      <button onClick={() => {
        this.props.deleteEducation(id); this.props.closeModal()
      }} className='delete btn'
      >Delete</button>
    ) : null;

    return (
      <div className='modal edu-form-modal'>
        <header>
          <h2>{this.props.formType}</h2>
          <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
        </header>
        <form className='edu-form'>
          <label>School *</label>
          <input type="text" className={schoolErr ? 'input-error' : ''} value={school} 
                 onChange={this.handleInput('school')}
                 onBlur={this.checkSchoolError}
          />
          {schoolErr ? <p className='error-msg'>Please enter a school name</p> : null}
          <label>Degree</label>
          <input type="text" value={degree} onChange={this.handleInput('degree')}/>
          <label>Field of study</label>
          <input type="text" value={field} onChange={this.handleInput('field')}/>
          <div className='school-years-form'>
            <div className='school-year-form'>
              <label>Start year</label>
              <select className={'yr-selector-form ' + (yearErr ? 'input-error' : '')} 
                      onChange={this.handleInput('startYear')}
                      onBlur={this.checkYearError}
              >
                {years.map(yr => {
                  if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                })}
              </select>
            </div>
            <div className='school-year-form'>
              <label>End year (or expected)</label>
              <select className={'yr-selector-form'} onChange={this.handleInput('endYear')}
                      onBlur={this.checkYearError}
              >
                {years.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
            {yearErr ? <p className='error-msg'>Your end year can't be earlier than your start year</p> : null}
          </div>
          <label>Grade</label>
          <input type="text" value={grade} onChange={this.handleInput('grade')}/>
          <label>Activities and societies</label>
          <textarea value={activities} onChange={this.handleInput('activities')}/>
          <label>Description</label>
          <textarea value={description} onChange={this.handleInput('description')}/>
        </form>
        <footer className='exp-edu-footer'>
          <button onClick={this.handleSubmit}>Save</button>
          {deleteBtn}
        </footer>
      </div>
    )
  }
}

export default EducationForm;