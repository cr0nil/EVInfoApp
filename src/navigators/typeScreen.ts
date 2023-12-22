export enum Route {
  Schedule = 'ScheduleScreen',
  Login = 'Login',
  Main = 'Main',
  HomeStack = 'HomeStack',
  Home = 'Home',
}

export type RootStackParamList = {
  [Route.Login]: undefined;

  [Route.Main]: undefined;
  [Route.Home]: undefined;
};

export type ScheduleStackParamList = {
  [Route.Schedule]: undefined;
};
