import * as React from 'react';
import { Text, View } from 'react-native';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/logic/RootReducer.js';
import thunk from 'redux-thunk';
import ApplicationHome from "./src/ApplicationHome";
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

export default function App() {
    return (
        <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
          <View
              style={{
                  backgroundColor: '#d5f5e7',
                  height: '100%',
              }}>
              <View>
                  <ApplicationHome />
              </View>
          </View>
      </Provider>
    );
}