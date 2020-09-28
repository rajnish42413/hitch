import React, { Dispatch } from 'react';
import { IAction, SetTourVisibility } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tour, { EVENTS, STATUS } from 'react-joyride';
import { colors } from '@constants/general';

function AppTour(props: any) {
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
      spotlightClicks={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(AppTour);

const steps = [
  {
    target: '[data-tut="first-step"]',
    content: (
      <p>
        Set your default preference <br />
        <Link to={{ pathname: '/preference', goback: '/home', state: { tourVisibal: true } }}>
          Go to preference
        </Link>
      </p>
    ),
  },
  {
    target: '[data-tut="second-step"]',
    content: 'Click here to see previous profile',
  },
  {
    target: '[data-tut="third-step"]',
    content: 'Click here to see next profile',
  },
  {
    target: '[data-tut="fifth-step"]',
    content: 'Report for this profile',
  },
  {
    target: '[data-tut="profile-shortlist"]',
    content: 'Shortlist profile',
  },
  {
    target: '[data-tut="profile-remove"]',
    content: 'Remove from match profile',
  },
];
