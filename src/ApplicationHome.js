import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setLocation } from './logic/location/actions';
import { setData } from './logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import Profile from './features/Profile';
import HouseList from './features/HouseList';
import SignIn from './features/SignIn';
import SignUp from './features/SignUp';
import House from './features/House';
import AddHouse from './features/AddHouse';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Settings from './features/Settings';
import HouseFilter from './features/HouseFilter';

export const ApplicationHome = ({ location, setLocation }) => {
  return (
    <View>
      <View style={styles.topNav}>
        <View>
          <Grid>
            <Col size={5}>
              <Text style={{ ...styles.header, position: 'absolute' }}>RoomMeet</Text>
            </Col>
            <Col size={2}>
              <View style={{ position: 'absolute' }}>
                <Icon
                  style={styles.topPadding}
                  name="list"
                  size={48}
                  color="#d5f5e7"
                  onPress={() => setLocation('home')}
                />
              </View>
            </Col>
            <Col size={2}>
              <View style={{ position: 'absolute' }}>
                <Icon
                  style={styles.topPadding}
                  name="supervisor-account"
                  size={48}
                  color="#d5f5e7"
                  onPress={() => setLocation('profile')}
                />
              </View>
            </Col>
            <Col size={2}>
              <View style={{ position: 'absolute' }}>
                <Icon
                  style={styles.topPadding}
                  name="settings-applications"
                  size={48}
                  color="#d5f5e7"
                  onPress={() => setLocation('settings')}
                />
              </View>
            </Col>
          </Grid>
        </View>
      </View>
      <View>
        {location === 'profile' && <Profile />}
        {location === 'home' && <HouseList />}
        {location === 'signin' && <SignIn />}
        {location === 'signup' && <SignUp />}
        {location === 'house' && <House />}
        {location === 'settings' && <Settings />}
        {location === 'addhouse' && <AddHouse editProp={false}/>}
        {location === 'edithouse' && <AddHouse editProp={true} />}
        {location === 'housefilter' && <HouseFilter />}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  appMargin: {
    margin: '1rem'
  },

  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    // fontFamily: 'sans-serif',
    marginTop: '2.5rem',
    marginLeft: '1rem'
  },

  topNav: {
    height: '6rem',
    zIndex: 5,
    backgroundColor: '#064f2f',
    top: 0,
    left: 0,
    width: '100%'
  },

  buttonStyle: {
    width: '40%',
    height: '100%',
    margin: '1rem'
  },

  profileButton: {
    marginTop: '16rem'
  },

  topPadding: {
    paddingTop: '2rem'
  }
});

const mapStateToProps = state => {
  return {
    location: state.location
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationHome);
