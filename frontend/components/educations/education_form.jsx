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
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value })
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
    this.setState({ yearErr: false });

    if (!this.handleErrors()) {
      this.props.processForm(this.state);
      this.props.closeModal();
    }
  }

  render() {
    const {
      school, degree, field, grade, activities, description, schoolErr, yearErr 
    } = this.state;
    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }

    return (
      <div className='modal edu-form-modal'>
        <header>
          <h2>{this.props.formType}</h2>
          <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
        </header>
        <form className='edu-form'>
          <label>School *</label>
          <input type="text" value={school} onChange={this.handleInput('school')}/>
          {schoolErr ? <p className='error-msg'>Please enter a school name</p> : null}
          <label>Degree</label>
          <input type="text" value={degree} onChange={this.handleInput('degree')}/>
          <label>Field of study</label>
          <input type="text" value={field} onChange={this.handleInput('field')}/>
          <div className='school-years-signup'>
            <div className='school-year-signup' >
              <label>Start year</label>
              <select className={'yr-selector-signup'} onChange={this.handleInput('start_year')}>
                {years.map(yr => {
                  if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                })}
              </select>
            </div>

            <div className='school-year-signup'>
              <label>End year (or expected)</label>
              <select className={'yr-selector-signup'} onChange={this.handleInput('end_year')}>
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
        </footer>
      </div>
    )
  }
}

export default EducationForm;