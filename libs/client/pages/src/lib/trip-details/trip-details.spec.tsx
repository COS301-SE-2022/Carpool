import { render } from '@testing-library/react';
import { HomeStackParamList } from '../NavigationTypes/navigation-types';

import TripDetails from './trip-details';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export type TripDetailsProps = NativeStackScreenProps<
  HomeStackParamList,
  'TripDetails'
>;
describe('TripDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripDetails />);
    expect(baseElement).toBeTruthy();
  });
});
