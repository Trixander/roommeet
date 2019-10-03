import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import HouseComponent from '../shared-components/HouseComponent';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-paper';
import { setLocation } from '../logic/location/actions';

export const HouseList = ({ houses, getData, setLocation, filter, auth }) => {
  useEffect(() => {
    getData('https://roommate-finder-afd9b.firebaseio.com/houses' + '.json', 'houses');
  }, []);
  return (
    <View style={styles.sectionHeight}>
      <ScrollView>
        <Button
          color="#064f2f"
          uppercase={false}
          mode="contained"
          style={styles.buttons}
          onPress={() => setLocation('housefilter')}>
          Change Filter
        </Button>
        <View style={styles.sectionPadding}>
          {houses &&
            Object.values(houses).map((house, index) => {

              return (
                (filter.availability
                  ? parseInt(filter.availability, 10) < parseInt(house.availability, 10)
                  : true) &&
                (filter.minRent ? parseInt(filter.minRent, 10) < parseInt(house.rent, 10) : true) &&
                (filter.maxRent ? parseInt(filter.maxRent, 10) > parseInt(house.rent, 10) : true) &&
                (filter.favorites ? house.favorites.includes(auth.email) : true) && (
                  <HouseComponent key={index} available={true} info={house} />
                )
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 6rem'
  },

  sectionPadding: {
    padding: '1rem'
  },

  buttons: {
    margin: '1rem'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    }
  };
};

const mapStateToProps = state => {
  return {
    houses: state.data.houses,
    filter: state.filter,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseList);
