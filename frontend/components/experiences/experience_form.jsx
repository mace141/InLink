import React from 'react';

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

class ExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.experience,
      startMon: "",
      endMon: "",
      startYear: "",
      endYear: "",
      titleErr: false,
      companyErr: false,
      yearErr: false,
      present: true
    };

    this.yearErrMsg = '';
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePresent = this.togglePresent.bind(this);
    this.checkError = this.checkError.bind(this);
    this.checkYearError = this.checkYearError.bind(this);
  }

  handleInput(field) {
    return e => {
      if (field == 'employmentType' && e.target.value == '-') {
        this.setState({ [field]: '' });
      } else {
        this.setState({ [field]: e.target.value });
      }
    }
  }

  checkError(field) {
    return e => {
      if (e.target.value == '') {
        this.setState({ [field]: true });
      } else {
        this.setState({ [field]: false });
      }
    }
  }

  checkYearError() {
    const { startYear, endYear, startMon, endMon, present } = this.state;
    const startYr = parseInt(startYear);
    const endYr = parseInt(endYear);

    if (!startYear.length && !startMon.length) {
      this.setState({ yearErr: true });
      this.yearErrMsg = 'Please enter your start date';
      return true;

    } else if (!present && !endYear.length && !endMon.length) {
      this.setState({ yearErr: true });
      this.yearErrMsg = 'Please enter your end date';
      return true;

    } else if (startYr > endYr || (startYr == endYr && months.indexOf(startMon) > months.indexOf(endMon))) {
      this.setState({ yearErr: true });
      this.yearErrMsg = "Your start date can't be after your end date";
      return true;

    } else {
      this.setState({ yearErr: false });
      return false;
    }
  }

  handleErrors() {
    const { title, company } = this.state;
    let errorBool = false;

    errorBool = this.checkYearError();

    if (!title.length) {
      this.setState({ titleErr: true });
      errorBool = true;
    }

    if (!company.length) {
      this.setState({ companyErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.handleErrors()) {
      const { startYear, startMon, endYear, endMon, present, userId, employmentType } = this.state;
  
      const start_date = `${startYear}-${months.indexOf(startMon) + 1}-01`
      let end_date;
  
      if (!present) {
        end_date = `${endYear}-${months.indexOf(endMon) + 1}-01`
      }
      
      this.props.processForm({
        ...this.state,
        user_id: userId,
        start_date,
        end_date,
        employment_type: employmentType
      });
      this.props.closeModal();
    }
  }

  togglePresent() {
    if (this.state.present) {
      this.setState({ present: false });
    } else {
      this.setState({ present: true });
    }
  }

  render() {
    const {
      id, title, company, location, description, titleErr, companyErr, yearErr, present,
      industry, headline
    } = this.state;

    const monthOptions = months.map(mon => (
      <option key={mon} value={mon}>{mon}</option>
    ));

    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }
    
    const endDateSelectors = present ? <p>Present</p> : (
      <>
        <select className='exp-selector-form' onChange={this.handleInput('endMon')}
          onBlur={this.checkYearError}
        >
          <option value="Month">Month</option>
          {monthOptions}
        </select>
        <select className='exp-selector-form' onChange={this.handleInput('endYear')}
          onBlur={this.checkYearError}
        >
          <option value="Year">Year</option>
          {years.map(yr => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </>
    )

    const deleteBtn = this.props.deleteExperience ? (
      <button onClick={() => {this.props.deleteExperience(id); this.props.closeModal()}}
      >Delete</button>
    ) : null;

    return (
      <div className='modal edu-form-modal'>
        <header>
          <h2>{this.props.formType}</h2>
          <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
        </header>
        <form className='exp-form'>
          <label>Title *</label>
          <input type="text" className={titleErr ? 'input-error': ''} value={title} 
                 onChange={this.handleInput('title')}
                 onBlur={this.checkError('titleErr')}
          />
          {titleErr ? <p className='error-msg'>Please enter your title</p> : null}
          <label>Employment type</label>
          <select onChange={this.handleInput('employmentType')}>
            {empTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label>Company *</label>
          <input type="text" className={companyErr ? 'input-error' : ''} value={company}
                 onChange={this.handleInput('company')}
                 onBlur={this.checkError('companyErr')}
          />
          {companyErr ? <p className='error-msg'>Please enter a company name</p> : null}
          <label>Location</label>
          <input type="text" value={location} onChange={this.handleInput('location')}/>
          <label className='checkbox'>
            <input type="checkbox" checked={present ? true : false} 
                   onChange={this.togglePresent}
            /> I am currently working this role
          </label>
          <div className='exp-years-form'>
            <div className='exp-year-form' >
              <label>Start Date *</label>
              <div className='exp-date'>
                <select className={'exp-selector-form ' + (yearErr ? 'input-error' : '')} 
                        onChange={this.handleInput('startMon')}
                        onBlur={this.checkYearError}
                >
                  <option value="Month">Month</option>
                  {monthOptions}
                </select>
                <select className={'exp-selector-form ' + (yearErr ? 'input-error' : '')} 
                        onChange={this.handleInput('startYear')}
                        onBlur={this.checkYearError}
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
            {yearErr ? <p className='error-msg'>{this.yearErrMsg}</p> : null}
          </div>
          <label>Industry</label>
          <input type='text' value={industry} onChange={this.handleInput('industry')}/>
          <label>Headline</label>
          <input type='text' value={headline} onChange={this.handleInput('headline')}/>
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

export default ExperienceForm;