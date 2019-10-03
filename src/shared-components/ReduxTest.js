import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../logic/data/actions';

export const ReduxComponent = ({ data, getSomeData }) => {
  return (
    <View>
      <Button title="Click" onPress={getSomeData} />
      <Text>{data}</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSomeData: () => {
      dispatch(getData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxComponent);
