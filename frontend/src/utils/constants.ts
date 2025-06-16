import { Dimensions } from 'react-native';

export const baseUrl = "http://192.168.50.132:3000";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export { DEVICE_WIDTH, DEVICE_HEIGHT };