import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { getData, putData } from '../logic/data/actions';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';
import { WrappedTextInput } from '../shared-components/FormField';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

export const House = ({ info, auth, putData, handleSubmit, test }) => {
  return (
    <View style={styles.sectionHeight}>
      <ScrollView>
        <View style={styles.formPadding}>
          <Card style={styles.card}>
            <View>
              <FormHeader title={info && info.name} />
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.imageArea}
                  source={{uri: info.image}}
                  resizeMode="center"
                />
              </View>
              <View style={styles.infoWrapper}>
                <Text style={styles.availability}>
                  {info ? (info.availability + ' room(s) available') : 'Not Available'}
                </Text>
                <Text style={styles.address}>{info ? info.address : 'No Info'}</Text>
                <Text style={styles.city}>
                  {info ? info.city : 'No Info'}, {info ? info.zip : 'No Info'}
                </Text>
                <Text style={styles.city}>Rent: ${info ? info.rent : 'No Info'} a month</Text>
              </View>
            </View>
            {auth.loggedIn ? (
              <Button
                color="#064f2f"
                uppercase={false}
                mode="contained"
                style={styles.buttons}
                onPress={() => {
                  info.favorites && (info.favorites.includes(auth.email)
                    ? info.favorites.splice(info.favorites.indexOf(auth.email), 1)
                    : (info.favorites || []).push(auth.email));

                  putData(
                    'https://roommate-finder-afd9b.firebaseio.com/houses/' + info.id + '.json',
                    {
                      ...info,
                      favorites: info.favorites
                    },
                    'home',
                    'house'
                  );
                }}>
                {info.favorites && info.favorites.includes(auth.email)
                  ? 'Remove Favorite'
                  : 'Favorite'}
              </Button>
            ) : (
              <Text>Sign in to favorite locations!</Text>
            )}
          </Card>
          {info.comments &&
            Object.values(info.comments).map((comment, index) => (
              <Card key={index} style={styles.comment}>
                <Text style={styles.poster}>{comment.poster} says:</Text>
                <Text>{comment.text}</Text>
              </Card>
            ))}
          {auth.loggedIn && (
            <Card style={styles.comment}>
              <Field
                name="comment"
                id="comment"
                props={{ title: 'New Comment' }}
                component={WrappedTextInput}
              />
              <Button
                color="#064f2f"
                uppercase={false}
                mode="contained"
                style={styles.buttons}
                onPress={handleSubmit(values => {
                  putData(
                    'https://roommate-finder-afd9b.firebaseio.com/houses/' + info.id + '.json',
                    {
                      ...info,
                      comments: (info.comments || []).concat([
                        { text: values.comment, poster: auth.email }
                      ])
                    },
                    'home',
                    'house'
                  );
                })}>
                Add Comment
              </Button>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 6rem'
  },

  card: {
    //  border: 'none',
    marginBottom: '1rem',
    height: '24rem',
    padding: '1rem'
  },

  comment: {
    marginBottom: '1rem',
    padding: '1rem'
  },

  poster: {
    fontWeight: 'bold'
  },

  imageWrapper: {
    flex: 1,
    height: '10rem'
  },

  infoWrapper: {
    paddingTop: '11rem'
  },

  imageArea: {
    width: '100%',
    height: '10rem'
  },

  houseName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '.5rem'
    // fontFamily: 'sans-serif',
  },

  availability: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    fontStyle: 'italic'
    // fontFamily: 'sans-serif',
  },

  address: {
    fontSize: '.9rem',
    marginBottom: '.25rem'
    // fontFamily: 'sans-serif',
  },

  city: {
    fontSize: '.9rem',
    marginBottom: '.25rem'
    // fontFamily: 'sans-serif',
  },

  formPadding: {
    padding: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    info: state.data.house,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    }
  };
};

const validate = values => {
  const errors = {};

  if (!values.comment) {
    errors.comment = 'Required';
  } else if (values.comment.length > 2000) {
    errors.comment = 'Must be less than 3000 characters';
  }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'house-comment-form', validate })
)(House);
