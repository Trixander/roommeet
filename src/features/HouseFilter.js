import { Field, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import * as React from 'react';
import { useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getData, putData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormHeader } from '../shared-components/FormHeader';
import { Button, Card, Checkbox } from 'react-native-paper';
import { ScrollView, Text, View } from 'react-native';
import { setFilter } from '../logic/filter/actions';
import { Col, Grid } from 'react-native-easy-grid';

export const HouseFilter = ({
  editProp,
  getData,
  putData,
  setLocation,
  auth,
  handleSubmit,
  profile,
  setFilter,
  filter
}) => {
  const [favorites, setFavorites] = useState(filter.favorites);

  return (
    <View style={styles.sectionHeight}>
      <ScrollView>
        <Card style={styles.card}>
          <FormHeader title={'Change Filter'} />
          <Field
            name="availability"
            id="availability"
            props={{ title: 'Availability (optional)' }}
            component={WrappedTextInput}
          />
          <Field
            name="minRent"
            id="minRent"
            props={{ title: 'Minimum Rent ($, optional)' }}
            component={WrappedTextInput}
          />
          <Field
            name="maxRent"
            id="maxRent"
            props={{ title: 'Maximum Rent($, optional)' }}
            component={WrappedTextInput}
          />
          {auth.loggedIn && (
            <Grid>
              <Col size={1}>
                <Checkbox
                  status={favorites ? 'checked' : 'unchecked'}
                  onPress={() => setFavorites(!favorites)}
                  color={'#064f2f'}
                />
              </Col>
              <Col size={6}>
                <Text style={styles.textMargin}>Only Show Favorites</Text>
              </Col>
            </Grid>
          )}
          <Button
            color="#064f2f"
            uppercase={false}
            mode="contained"
            style={styles.buttons}
            onPress={handleSubmit(values => {
              setFilter({
                availability: values.availability,
                minRent: values.minRent,
                maxRent: values.maxRent,
                favorites
              });
              setLocation('home');
            })}>
            {'Save Filter'}
          </Button>
          <Button
            color="#064f2f"
            uppercase={false}
            mode="text"
            onPress={() => {
              setFilter({
                availability: null,
                minRent: null,
                maxRent: null,
                favorites: false
              });
              setLocation('home');
            }}>
            {'Clear Filter'}
          </Button>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 6rem'
  },

  card: {
    padding: '1rem',
    margin: '1rem'
    //  border: 'none',
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  },

  textMargin: {
    marginTop: '.5rem'
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.data.profile,
    initialValues: state.filter,
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    },
    initialize: values => {
      dispatch(initialize('filter-form', values));
    },
    setFilter: filter => {
      dispatch(setFilter(filter));
    }
  };
};

const validate = values => {
  const errors = {};

  if (parseInt(values.availability, 10) < 0 || parseInt(values.availability, 10) > 10) {
    errors.availability = 'Must be between 0 and 10';
  } else if (isNaN(values.availability)) {
    errors.availability = 'Must be a number';
  }

  if (parseInt(values.minRent, 10) < 200 && parseInt(values.minRent, 10) !== 0) {
    errors.minRent = 'Must be at least 200';
  } else if (parseInt(values.minRent, 10) > 10000) {
    errors.minRent = 'Must be less than 10000';
  } else if (
    parseInt(values.minRent, 10) > parseInt(values.maxRent, 10) &&
    parseInt(values.maxRent, 10) !== 0
  ) {
    errors.minRent = 'Minimum rent must be less than maximum rent';
  } else if (isNaN(values.minRent)) {
    errors.minRent = 'Must be a number';
  }

  if (parseInt(values.maxRent, 10) < 200 && parseInt(values.maxRent, 10) !== 0) {
    errors.maxRent = 'Must be at least 200';
  } else if (parseInt(values.maxRent, 10) > 10000) {
    errors.maxRent = 'Must be less than 10000';
  } else if (
    parseInt(values.maxRent, 10) < parseInt(values.minRent, 10) &&
    parseInt(values.minRent, 10) !== 0
  ) {
    errors.maxRent = 'Maximum rent must be greater than minimum rent';
  } else if (isNaN(values.maxRent)) {
    errors.maxRent = 'Must be a number';
  }

  /* if (!values.minRent) {
    errors.rent = 'Required';
  } else if (parseInt(values.rent, 10) < 200 || parseInt(values.rent, 10) > 3000) {
    errors.rent = 'Must be 200-3000';
  } else if (isNaN(values.rent)) {
    errors.rent = 'Must be a number';
  } */

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'filter-form', validate })
)(HouseFilter);
