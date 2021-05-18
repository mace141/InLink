import React from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
const empTypes = [
  '-', 'Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Contract', 'Internship', 'Apprenticeship', 'Seasonal'
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
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleErrors() {
    const { startYear, endYear, startMon, endMon, title, company, present } = this.state;
    let errorBool = false;

    if (!startYear.length && !startMon.length) {
      this.setState({ yearErr: true });
      errorBool = true;
      this.yearErrMsg = 'Please enter your start date';

    } else if (!present && !endYear.length && !endMon.length) {
      this.setState({ yearErr: true });
      errorBool = true;
      this.yearErrMsg = 'Please enter your end date';

    } else {
      const startYr = parseInt(startYear);
      const endYr = parseInt(endYear);
      
      if (startYr > endYr || (startYr == endYr && months.indexOf(startMon) > months.indexOf(endMon))) {
        this.setState({ yearErr: true });
        errorBool = true;
        this.yearErrMsg = "Your start date can't be after your end date";
      } 
    }

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
    this.setState({ yearErr: false });
    this.setState({ titleErr: false });
    this.setState({ companyErr: false });

    
    if (!this.handleErrors()) {
      const { startYear, startMon, endYear, endMon, present, userId } = this.state;
  
      const start_date = `${startYear}-${months.indexOf(startMon) + 1}-01`
      let end_date;
  
      if (!present) {
        end_date = `${endYear}-${months.indexOf(endMon) + 1}-01`
      }

      this.props.processForm({
        ...this.state,
        user_id: userId,
        start_date,
        end_date
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
      title, company, location, description, titleErr, companyErr, yearErr, present,
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
        <select className='exp-selector-form' onChange={this.handleInput('endMon')}>
          <option value="Month">Month</option>
          {monthOptions}
        </select>
        <select className='exp-selector-form' onChange={this.handleInput('endYear')}>
          <option value="Year">Year</option>
          {years.map(yr => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </>
    )

    return (
      <div className='modal edu-form-modal'>
        <header>
          <h2>{this.props.formType}</h2>
          <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
        </header>
        <form className='exp-form'>
          <label>Title *</label>
          <input type="text" value={title} onChange={this.handleInput('title')}/>
          {titleErr ? <p className='error-msg'>Please enter your title</p> : null}
          <label>Employment type</label>
          <select>
            {empTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label>Company *</label>
          <input type="text" value={company} onChange={this.handleInput('company')}/>
          {companyErr ? <p className='error-msg'>Please enter a company name</p> : null}
          <label>Location</label>
          <input type="text" value={location} onChange={this.handleInput('location')}/>
          <label className='checkbox'>
            <input type="checkbox" checked={present ? true : false} onChange={this.togglePresent}/> I am currently working this role
          </label>
          <div className='exp-years-form'>
            <div className='exp-year-form' >
              <label>Start Date *</label>
              <div className='exp-date'>
                <select className='exp-selector-form' onChange={this.handleInput('startMon')}>
                  <option value="Month">Month</option>
                  {monthOptions}
                </select>
                <select className='exp-selector-form' onChange={this.handleInput('startYear')}>
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
        </footer>
      </div>
    )
  }
}

export default ExperienceForm;