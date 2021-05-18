import React from 'react';

class ExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.experience,
      titleErr: false,
      companyErr: false,
      yearErr: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleErrors() {
    const { startYear, endYear, startMon, endMon, title, company } = this.state;
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const startYr = parseInt(startYear);
    const endYr = parseInt(endYear);
    let errorBool = false;

    if (startYr > endYr || (startYr == endYr && months.indexOf(startMon) > months.indexOf(endMon))) {
      this.setState({ yearErr: true });
      errorBool = true;
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
      this.props.processForm(this.state);
      this.props.closeModal();
    }
  }

  render() {
    const {
      title, company, location, description, titleErr, companyErr, yearErr 
    } = this.state;
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const empTypes = [
      '-', 'Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Contract', 'Internship', 'Apprenticeship', 'Seasonal'
    ];

    const monthOptions = months.map(mon => (
      <option key={mon} value={mon}>{mon}</option>
    ));

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
          <div className='exp-years-form'>
            <div className='exp-year-form' >
              <label>Start Date *</label>
              <div>
                <select className='exp-selector-form' onChange={this.handleInput('startMon')}>
                  {monthOptions}
                </select>
                <select className='exp-selector-form' onChange={this.handleInput('startYear')}>
                  {years.map(yr => {
                    if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                  })}
                </select>
              </div>
            </div>
            <div className='exp-year-form'>
              <label>End Date *</label>
              <div>
                <select className='exp-selector-form' onChange={this.handleInput('endMon')}>
                  {monthOptions}
                </select>
                <select className='exp-selector-form' onChange={this.handleInput('endYear')}>
                  {years.map(yr => (
                    <option key={yr} value={yr}>{yr}</option>
                    ))}
                </select>
              </div>
            </div>
            {yearErr ? <p className='error-msg'>Your end year can't be earlier than your start year</p> : null}
          </div>
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