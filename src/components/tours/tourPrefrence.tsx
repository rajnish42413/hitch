import React, { Dispatch } from 'react';
import { IAction, SetTourVisibility } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tour, { EVENTS, STATUS } from 'react-joyride';
import { colors } from '@constants/general';

function PrefrenceTour(props: any) {
  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      // this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      props.setTourVisibal(false);
    }
  };

  return (
    <Tour
      steps={steps}
      run={props.visible}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      styles={{
        options: {
          // modal arrow and background color
          arrowColor: '#eee',
          backgroundColor: '#eee',
          // page overlay color
          overlayColor: 'rgba(0, 0, 0, 0.65)',
          //button color
          primaryColor: colors['primary-color'],
          //text color
          textColor: '#333',
        },
      }}
    />
  );
}

const steps = [
  {
    target: '[data-tut="pre-first-step"]',
    content: ' Select min date of birth!',
  },
  {
    target: '[data-tut="pre-second-step"]',
    content: 'Change city name',
  },
  {
    target: '[data-tut="pre-third-step"]',
    content: 'Select community',
  },
  {
    target: '[data-tut="pre-fourth-step"]',
    content: 'Select marital status',
  },
  {
    target: '[data-tut="pre-fifth-step"]',
    content: 'Select Min height',
  },
  {
    target: '[data-tut="pre-sixth-step"]',
    content: () => (
      <div>
        <div color="#e5e5e5">Select education level</div>
        <Link to={{ pathname: '/home', goback: '/home', state: { isFirstTime: true } }}>
          {' '}
          Go to Home
        </Link>
        <Link to={{ pathname: '/profile-users', state: { isFirstTime: true } }}>
          {' '}
          Profile Users
        </Link>
      </div>
    ),
  },
];

const mapStateToProps = ({ tour }: IAppState) => {
  return {
    visible: tour.visible,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setTourVisibal: (data: boolean) => dipatch(SetTourVisibility(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrefrenceTour);
